from cv2 import cv2
import numpy as np
import os
import glob


def crop_frames(image, boxes):
    return [cv2.cvtColor(np.array(image[box.y:(box.y+box.height), box.x:(box.x+box.width), :]), cv2.COLOR_BGR2RGB) for box in boxes]
