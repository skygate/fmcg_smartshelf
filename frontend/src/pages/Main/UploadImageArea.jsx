import React from "react";
import { message } from "antd";

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
  const { setReport, report } = React.useContext(ReportContext);

  const handleReset = () => {
    setImageToDisplay(null);
    setIsWebCameraActive(false);
    setImageToDetect(null);
    setReport(initialState);
  };

  const handleDetection = async (imageToDiagnoze) => {
    setShouldHideGif(true);
    getStatus(imageToDiagnoze, new Date().getTime())
      .then(setReport)
      .catch(() => {
        message.error("Sorry, something went wrong :( Try again");
      })
      .then(() => {
        setShouldHideGif(false);
      });
  };

  return imageToDisplay ? (
    <Loader
      shouldHideGif={shouldHideGif}
      handleReset={handleReset}
      handleDetection={handleDetection}
      imageToDisplay={imageToDisplay}
      imageToDetect={imageToDetect}
      report={report}
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
