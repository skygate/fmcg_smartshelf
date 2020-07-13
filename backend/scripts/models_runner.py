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

    def run(
        self,
    ) -> Tuple[str, np.ndarray, Optional[Dict[str, Dict[str, Union[str, bool]]]]]:
        states = ["creased", "defective", "good"]
        state_classification_result = self.classifier.make_classification(
            "classifier.pth", states
        )

        defect_types = [
            "recess_critical",
            "recess_non_critical",
            "scratch_critical",
            "scratch_non_critical",
        ]
        defects = None
        if state_classification_result == "defective":
            bboxes, defects = self.detector.get_bboxes(defect_types)
            self.drawer.draw_bboxes(bboxes)

        return (
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
            is_critical = self._is_critical(self.classes[idx])
            bboxes[bbox] = {"id": counter + 1, "is_critical": is_critical}
            defects[str(counter + 1)] = {
                "defect_type": defect_types[self.classes[idx]].split("_")[0],
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

    def _is_critical(self, label: int) -> bool:
        return True if label == 0 or label == 2 else False


class Drawer:
    """
    Class that draws on the given image
    """

    def __init__(self, image: np.ndarray) -> None:
        self.image = cv2.resize(image, (1920, 1080))

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


class ClassActivationMapper:
    """
    Class that generates Class Activation Map (CAM)
    """

    def __init__(self) -> None:
        pass
