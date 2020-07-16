import React from "react";
import camelcaseKeys from "camelcase-keys";

import { PictureWithDamage } from "./PictureWithDamage";
import { UploadMenu } from "./UploadMenu";
import { getStatus, getPictureWithDamage } from "../../services/UploadImage";
import { Loader } from "./Loader";
import { STATUSES } from "../../constants";
import { ReportContext } from "../../context/ReportContext";
import { initialState } from "../../context/initialState";

export const UploadImageArea = () => {
  const [shouldHideGif, setShouldHideGif] = React.useState(false);
  const [imageToDetect, setImageToDetect] = React.useState(null);
  const [pictureWithDamage, setPictureWithDamage] = React.useState(null);
  const [imageToDisplay, setImageToDisplay] = React.useState(null);
  const [isWebCameraActive, setIsWebCameraActive] = React.useState(false);
  const { setReport } = React.useContext(ReportContext);

  const handleReset = () => {
    setImageToDisplay(null);
    setPictureWithDamage(null);
    setIsWebCameraActive(false);
    setImageToDetect(null);
    setReport(initialState);
  };

  const activateGif = () => {
    setShouldHideGif(true);
    setTimeout(() => {
      setShouldHideGif(false);
    }, 2000);
  };

  const getDagamesList = (imageToDiagnoze) => {
    const data = new FormData();
    data.append("file", imageToDiagnoze);
    return getStatus(data);
  };

  const getPictureWithMarkedDamages = async (damagesList) => {
    const picture = await getPictureWithDamage({
      filename: damagesList.filename,
    });
    const objectURL = URL.createObjectURL(picture);
    return setPictureWithDamage(objectURL);
  };

  const checkStatuses = async (damagesList) => {
    setReport(camelcaseKeys(damagesList, { deep: true }));
    if (damagesList.state === STATUSES.SUCCESS) {
      return;
    }
    getPictureWithMarkedDamages(damagesList);
  };

  const handleDetection = async (imageToDiagnoze) => {
    activateGif();
    const damagesList = await getDagamesList(imageToDiagnoze);
    checkStatuses(damagesList);
  };

  if (pictureWithDamage) {
    return (
      <PictureWithDamage
        pictureWithDamage={pictureWithDamage}
        handleReset={handleReset}
      />
    );
  }

  if (imageToDisplay) {
    return (
      <Loader
        shouldHideGif={shouldHideGif}
        handleReset={handleReset}
        handleDetection={handleDetection}
        imageToDisplay={imageToDisplay}
        imageToDetect={imageToDetect}
      />
    );
  }
  return (
    <UploadMenu
      isWebCameraActive={isWebCameraActive}
      setImageToDetect={setImageToDetect}
      setImageToDisplay={setImageToDisplay}
      setIsWebCameraActive={setIsWebCameraActive}
    />
  );
};
