import os
from typing import List, Tuple, Dict, Optional, Union

import PIL
import cv2
import numpy as np
import torch
import torchvision.transforms as transforms
from PIL import Image
from gradcam import GradCAMpp
from gradcam.utils import visualize_cam
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

from .crop_frames import crop_frames


class Runner:
    """
    Class that runs the system sequence steps
    """

    def __init__(self, image: PIL.Image, boxes) -> None:
        self.pil_image = image
        self.opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        self.boxes = boxes

        self.frames = crop_frames(self.opencv_image, boxes)

        self.classifier = Classifier("classifier.pth")

    def run(self) -> str:
        frames = []
        
        for idx, frame in enumerate(self.frames):
            img = Image.fromarray(frame.astype('uint8'), 'RGB')
            self.classifier.update_image(img)
            box = self.boxes[idx]
            
            frames.append((box, self.classifier.make_classification()))
            
        return frames


class Classifier:
    """
    Class that makes classification of the image using trained model
    """
    
    def __init__(self, model_name: str) -> None:
        self.device: torch.device = torch.device(
            "cuda:0" if torch.cuda.is_available() else "cpu"
        )
        self.model: ResNet = torch.load(
            os.path.join(CLASSIFIERS_PATH, model_name), map_location=self.device
        )
        self.model.to(self.device).eval()
        self.class_names = ["empty", "full", "not_full_not_empty", "other"]
        self.image_tensor: Optional[torch.Tensor] = None

        
    def update_image(self, image: PIL.Image) -> None:
        preprocess = self._preprocess_image()
        image_tensor = preprocess(image).float()
        self.image_tensor = image_tensor.unsqueeze_(0)


    def _preprocess_image(self) -> transforms.Compose:
        compose_transforms = [
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(np.asarray(MEAN), np.asarray(STD)),
        ]
        return transforms.Compose(compose_transforms)


    def make_classification(self) -> str:
        fc_out = self.model(Variable(self.image_tensor))
        output = fc_out.detach().numpy()
        return self.class_names[output.argmax()]


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
    Class that creates Class Activation Map (CAM)
    """

    def __init__(self, image: PIL.Image) -> None:
        self.device: torch.device = torch.device(
            "cuda:0" if torch.cuda.is_available() else "cpu"
        )
        self.image = image
        self.image_tensor = self._convert_image_to_tensor()
        self.image_normalized = self._normalize_image()

    def _convert_image_to_tensor(self) -> torch.Tensor:
        compose_transforms = [transforms.Resize(RESOLUTION), transforms.ToTensor()]
        return transforms.Compose(compose_transforms)(self.image)

    def _normalize_image(self) -> torch.Tensor:
        return transforms.Normalize(np.asarray(MEAN), np.asarray(STD))(
            self.image_tensor
        )[None]

    def get_class_activation_map(self, model_name: str) -> np.ndarray:
        model: ResNet = torch.load(
            os.path.join(CLASSIFIERS_PATH, model_name), map_location=self.device
        )
        model.to(self.device).eval()
        target_layer = model._modules.get("layer4")
        gradcam = GradCAMpp(model, target_layer)
        mask, _ = gradcam(self.image_normalized)
        heatmap, result = visualize_cam(mask, self.image_tensor)

        heatmap = torch.squeeze(heatmap)
        heatmap = transforms.ToPILImage()(heatmap)
        heatmap = cv2.cvtColor(np.array(heatmap), cv2.COLOR_RGB2BGR)
        heatmap = cv2.resize(heatmap, self.image.size)

        image = cv2.cvtColor(np.array(self.image), cv2.COLOR_RGB2BGR)
        return cv2.addWeighted(image, 0.75, heatmap, 0.25, 0.0)
