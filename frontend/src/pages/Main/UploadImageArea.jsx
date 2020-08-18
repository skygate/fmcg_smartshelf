import React from "react";

import { UploadMenu } from "./UploadMenu";
import { getStatus } from "../../services/UploadImage";
import { Loader } from "./Loader";
import { ReportContext } from "../../context/ReportContext";
import { initialState } from "../../context/initialState";

export const UploadImageArea = () => {
  const [shouldHideGif, setShouldHideGif] = React.useState(false);
  const [imageToDetect, setImageToDetect] = React.useState(null);
  const [imageToDisplay, setImageToDisplay] = React.useState(null);
  const [isWebCameraActive, setIsWebCameraActive] = React.useState(false);
  const { setReport } = React.useContext(ReportContext);

  const handleReset = () => {
    setImageToDisplay(null);
    setIsWebCameraActive(false);
    setImageToDetect(null);
    setReport(initialState);
  };

  const handleDetection = async (imageToDiagnoze) => {
    setShouldHideGif(true);
    const damagesList = await getStatus(imageToDiagnoze);
    setReport(damagesList);
    setShouldHideGif(false);
  };

  return imageToDisplay ? (
    <Loader
      shouldHideGif={shouldHideGif}
      handleReset={handleReset}
      handleDetection={handleDetection}
      imageToDisplay={imageToDisplay}
      imageToDetect={imageToDetect}
    />
  ) : (
    <UploadMenu
      isWebCameraActive={isWebCameraActive}
      setImageToDetect={setImageToDetect}
      setImageToDisplay={setImageToDisplay}
      setIsWebCameraActive={setIsWebCameraActive}
    />
  );
};
