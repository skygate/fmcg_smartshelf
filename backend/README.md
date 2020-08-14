# Air motor PoC
Prove of concept app that classifies the object as good, creased or defective. When the object is classified as defective, system runs the detector that detects scratches and recess.

![](https://i.ibb.co/L87pyC7/img.jpg)

Built using deep learning library [pytorch](https://github.com/pytorch/pytorch).

## Getting Started

Clone this repository by typing in the terminal
```
git clone git@github.com:skygate/air-motor-poc.git
cd air-motor-poc
```

Next step is to download file folder from
```
https://drive.google.com/drive/folders/14UENOKiq7xAvj0hPL0rEVoe-kIJAnieQ?usp=sharing
```
and then copy files to the repository folders.

Next step is to install docker and docker-compose.

Then you need to build the container by entering in your terminal
```
docker-compose build
```

## Usage

To start app, type in your terminal
```
docker-compose up
```

## Endpoints

The first endpoint is
```
localhost:5000/run
```
where you have to POST an image with key "file".
As return you will receive following json
```
{
  "defects": [JSON_WITH_DEFECTS_AND_ITS_LEVEL_OF_CRITICALITY],
  "filename": [FILENAME_WITH_EXTENSION],
  "state": [STATE]
}
```


The second endpoint is
```
localhost:5000/get_detections
```
where you have to POST a following json
```
{
    "filename": [FILENAME_WITH_EXTENSION]
}
```
then an image with bouding boxes on detected defects will be returned.


## Models

The model has to be placed inside the directory `models/classifiers/`.
E.g.: `models/classifiers/classifier.pth`
