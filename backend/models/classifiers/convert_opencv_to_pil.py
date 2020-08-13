import cv2
import numpy as np
from PIL import Image

opencv_image=cv2.imread("demo2.jpg") # open image using openCV2

# convert from openCV2 to PIL. Notice the COLOR_BGR2RGB which means that 
# the color is converted from BGR to RGB
pil_image=Image.fromarray(
    cv2.cvtColor(opencv_image, cv2.COLOR_BGR2RGB)
)