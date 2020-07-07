import React from "react";

import { PictureWithDamage } from "./PictureWithDamage";
import { UploadMenu } from "./UploadMenu";
import { getStatus, getPictureWithDamage } from "../../services/UploadImage";
import { Loader } from "./Loader";

export const UploadImageArea = ({ setSuccessStatus, setFailureStatus }) => {
  const [hideGif, setHideGif] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [pictureWithDamage, setPictureWithDamage] = React.useState(null);
  const [imagePreviewState, setImagePreviewState] = React.useState(null);
  const [isWebCameraActive, setIsWebCameraActive] = React.useState(false);
  const [decodedImage, setDecodedImage] = React.useState(null);
  const [imageSrc, setImageSrc] = React.useState(null);

  const handleReset = () => {
    setImagePreviewState(null);
    setPictureWithDamage(null);
    setFailureStatus(null);
    setSuccessStatus(null);
    setIsWebCameraActive(null);
    setImageSrc(null);
    setUploadedImage(null);
    setDecodedImage(null);
  };

  const activateGif = () => {
    setHideGif(true);
    setTimeout(() => {
      setHideGif(false);
    }, 2000);
  };

  const getDagamesList = (imageToDiagnoze) => {
    const data = new FormData();
    data.append("file", imageToDiagnoze);
    return getStatus(data);
  };

  const checkStatus = async (damagesList) => {
    if (damagesList.state === "good") {
      return setSuccessStatus(damagesList);
    }
    setFailureStatus(damagesList);
    const picture = await getPictureWithDamage({
      filename: damagesList.filename,
    });
    const objectURL = URL.createObjectURL(picture);
    setPictureWithDamage(objectURL);
  };

  const handleDetection = async (imageToDiagnoze) => {
    activateGif();
    const damagesList = await getDagamesList(imageToDiagnoze);
    checkStatus(damagesList);
  };

  if (pictureWithDamage) {
    return (
      <PictureWithDamage
        pictureWithDamage={pictureWithDamage}
        handleReset={handleReset}
      />
    );
  }

  if (imagePreviewState || imageSrc) {
    return (
      <Loader
        hideGif={hideGif}
        handleReset={handleReset}
        handleDetection={handleDetection}
        imagePreviewState={imagePreviewState}
        imageSrc={imageSrc}
        uploadedImage={uploadedImage}
        decodedImage={decodedImage}
      />
    );
  }
  return (
    <UploadMenu
      isWebCameraActive={isWebCameraActive}
      setImageSrc={setImageSrc}
      imageSrc={imageSrc}
      setUploadedImage={setUploadedImage}
      setImagePreviewState={setImagePreviewState}
      setIsWebCameraActive={setIsWebCameraActive}
      setDecodedImage={setDecodedImage}
    />
  );
};
