import os
from typing import List, Tuple, Dict, Optional, Union

import PIL
import cv2
import numpy as np
import torch
import torchvision.transforms as transforms
from PIL import Image
from torch.autograd import Variable
from torchvision.models import ResNet

from config import (
    CLASSIFIERS_PATH,
    DETECTOR_CFG,
    DETECTOR_WEIGHTS,
    RESOLUTION,
    MEAN,
    STD,
    CRITICALITY_RATIO,
)


class Runner:
    """
    Class that runs the system sequence steps
    """

    def __init__(self, image: PIL.Image) -> None:
        self.pil_image = image
        self.opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        self.classifier = Classifier(self.pil_image)
        self.drawer = Drawer(self.opencv_image)
        self.detector = Detector(self.opencv_image)

    def show_detections(self) -> None:
        _, __, image, ___ = self.run()

        cv2.imshow("Image", image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def run(
        self,
    ) -> Tuple[str, str, np.ndarray, Optional[Dict[str, Dict[str, Union[str, bool]]]]]:
        object_types = ["plate", "flat"]
        object_classification_result = self.classifier.make_classification(
            "object_classifier.pth", object_types
        )

        states = ["good", "defective"]
        models = {
            "plate": self.classifier.make_classification("plate_state.pth", states),
            "flat": self.classifier.make_classification("flat_state.pth", states),
        }
        state_classification_result = models[object_classification_result]

        # self.drawer.put_text(object_classification_result, state_classification_result)

        defect_types = ["scratches", "recess"]
        defects = None
        if state_classification_result == "defective":
            bboxes, defects = self.detector.get_bboxes(defect_types)
            self.drawer.draw_bboxes(bboxes)

        return (
            object_classification_result,
            state_classification_result,
            self.drawer.image,
            defects,
        )


class Classifier:
    """
    Class that makes classification of the image using trained model
    """

    def __init__(self, image: PIL.Image) -> None:
        self.device: torch.device = torch.device(
            "cuda:0" if torch.cuda.is_available() else "cpu"
        )
        self.image = image
        self.image_tensor = self._convert_image_to_tensor()

    def _convert_image_to_tensor(self) -> torch.Tensor:
        preprocess = self._preprocess_image()
        image_tensor = preprocess(self.image).float()
        return image_tensor.unsqueeze_(0)

    def _preprocess_image(self) -> transforms.Compose:
        compose_transforms = [
            transforms.Resize(RESOLUTION),
            transforms.ToTensor(),
            transforms.Normalize(np.asarray(MEAN), np.asarray(STD)),
        ]
        return transforms.Compose(compose_transforms)

    def make_classification(self, model_name: str, classes: List[str]) -> str:
        model: ResNet = torch.load(
            os.path.join(CLASSIFIERS_PATH, model_name), map_location=self.device
        )
        model.to(self.device).eval()
        fc_out = model(Variable(self.image_tensor))
        output = fc_out.detach().numpy()
        return classes[output.argmax()]


class Detector:
    """
    Class that detects defects on image using trained model
    """

    def __init__(self, image: np.ndarray) -> None:
        self.image = cv2.resize(image, (1920, 1080))
        self.image_width = self.image.shape[1]
        self.image_height = self.image.shape[0]
        self.model = cv2.dnn.readNet(DETECTOR_CFG, DETECTOR_WEIGHTS)
        self.confidences = None
        self.boxes = None
        self.classes = None
        self.criticality_ratio = CRITICALITY_RATIO

    def get_bboxes(
        self, defect_types: List[str]
    ) -> Tuple[
        Dict[Tuple[int, int, int, int], Dict[str, bool]],
        Dict[str, Dict[str, Union[str, bool]]],
    ]:
        indices = self._remove_high_overlapping_boxes()
        bboxes = {}
        defects = {}
        for counter, idx in enumerate(indices):
            idx = idx[0]
            x, y, w, h = self.boxes[idx]
            bbox = round(x), round(y), round(w), round(h)
            is_critical = self._is_critical(bbox, self.classes[idx])
            bboxes[bbox] = {"id": counter + 1, "is_critical": is_critical}
            defects[str(counter + 1)] = {
                "defect_type": defect_types[self.classes[idx]],
                "is_critical": is_critical,
            }
        return bboxes, defects

    def _remove_high_overlapping_boxes(self) -> np.ndarray:
        self._get_detections()
        return cv2.dnn.NMSBoxes(self.boxes, self.confidences, 0.5, 0.4)

    def _get_detections(self) -> None:
        self.confidences = []
        self.boxes = []
        self.classes = []
        outs = self._detect_objects()
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.5:
                    center_x = int(detection[0] * self.image_width)
                    center_y = int(detection[1] * self.image_height)
                    w = int(detection[2] * self.image_width)
                    h = int(detection[3] * self.image_height)
                    x = center_x - w / 2
                    y = center_y - h / 2
                    self.confidences.append(float(confidence))
                    self.boxes.append([x, y, w, h])
                    self.classes.append(class_id)

    def _detect_objects(self) -> List[List[List[float]]]:
        image_blob = self._preprocess()
        self.model.setInput(image_blob)
        return self.model.forward(self._get_output_layers())

    def _preprocess(self) -> np.ndarray:
        return cv2.dnn.blobFromImage(
            self.image, 0.004, (416, 416), (0, 0, 0), True, crop=False
        )

    def _get_output_layers(self) -> List[str]:
        layer_names = self.model.getLayerNames()
        return [layer_names[i[0] - 1] for i in self.model.getUnconnectedOutLayers()]

    def _is_critical(self, bbox: Tuple[int, int, int, int], label: int) -> bool:
        is_critical = False
        if label == 1:
            is_critical = True
        else:
            _, __, bbox_width, bbox_height = bbox
            if bbox_width * bbox_height > self.criticality_ratio:
                is_critical = True
        return is_critical


class Drawer:
    """
    Class that draws on the given image
    """

    def __init__(self, image: np.ndarray) -> None:
        self.image = cv2.resize(image, (1920, 1080))

    def put_text(self, object_type: str, state: str) -> None:
        cv2.putText(
            self.image,
            f"Object: {object_type}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            2,
        )
        color = (0, 255, 0) if state == "good" else (0, 0, 255)
        cv2.putText(
            self.image,
            f"State: {state}",
            (10, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            color,
            2,
        )

    def draw_bboxes(
        self, bboxes: Dict[Tuple[int, int, int, int], Dict[str, bool]]
    ) -> None:
        for bbox, label in bboxes.items():
            p1 = (bbox[0], bbox[1])
            p2 = (bbox[0] + bbox[2], bbox[1] + bbox[3])
            color = (0, 56, 255) if label["is_critical"] else (255, 255, 0)
            cv2.rectangle(self.image, p1, p2, color, 3)
            cv2.putText(
                self.image,
                str(label["id"]),
                (
                    int((2 * bbox[0] + bbox[2]) / 2) - 10,
                    int((2 * bbox[1] + bbox[3]) / 2) + 10,
                ),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                color,
                3,
            )
