import React from "react";

import { UploadMenu } from "./UploadMenu";
import { getStatus } from "../../services/UploadImage";
import { Loader } from "./Loader";
import { STATUSES } from "../../constants";
import { ReportContext } from "../../context/ReportContext";
import { initialState } from "../../context/initialState";
import Canvas from "../../components/Canvas";

const boxes = [
  { leftUpper: { x: 884, y: 613 }, rightLower: { x: 948, y: 745 } },
  //   (944, 613, 999, 745),
  //   (999, 613, 1055, 745),
  //   (1053, 613, 1114, 745),
  //   (890, 749, 954, 879),
  //   (946, 749, 1005, 879),
  //   (1002, 749, 1061, 879),
  //   (1056, 749, 1114, 879),
  //   (894, 880, 960, 1052),
  //   (949, 880, 1015, 1052),
  //   (1008, 880, 1071, 1052),
  //   (1064, 880, 1114, 1052),
];

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
    const damagesList = await getStatus(imageToDiagnoze, boxes);
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
