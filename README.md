# Air motor PoC
Prove of concept app that classifies an object as a plate or a flat, then classifies the object as good or defective. When the object is classified as defective, system runs the detector that detects scratches and recess.

![](https://i.ibb.co/L87pyC7/img.jpg)

Built using deep learning library [pytorch](https://github.com/pytorch/pytorch).

## Getting Started

Clone this repository by typing in the terminal
```
git clone git@github.com:wojciechczarnecki/air_motor_poc.git
cd air_motor_poc
```

Next step is to download file folder from
```
https://drive.google.com/drive/folders/1Yp5OKo5APeQI-1ruxe5EN_43v_W1yjub?usp=sharing
```
and then copy files to repository folders.

Then you need to install the requirements by entering in your terminal
```
pip install -r requirements.txt
```

## Usage

To start processing the image, type in your terminal
```
python main.py -n [IMAGE_FILENAME]
```

The image has to be in the data folder.
