import React from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

import { colors, mediaQueries } from "../../styles/variable";
import * as S from "../../components/MainPage";

const CameraWrapper = styled.div`
  ${mediaQueries.sm} {
    margin-left: 2.5rem;
  }
`;

const CameraButton = styled.button`
  width: 9.5rem;
  height: 2rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.cameraButtonBorder};
  border-radius: 2px;
  color: ${colors.cameraButtonFont};
  font-weight: 500;
  ${mediaQueries.sm} {
    margin-left: 0.5rem;
  }
`;

export const StyledWebCamera = styled(Webcam)`
  ${S.ImagesSize}
  margin:0;
  ${mediaQueries.xxl} {
    margin: 0;
  }
`;

const ScreenshotButton = styled.button``;

export const WebCamera = ({
  setIsWebCameraActive,
  imageSrc,
  setImageSrc,
  setDecodedImage,
}) => {
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const webcamRef = React.useRef(null);

  const handleCapture = React.useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot());
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        setDecodedImage(
          new File([blob], "Filename.jpg", { type: "image/jpg" })
        );
      });
  }, [webcamRef]);

  const handleEnableWebcam = () => {
    setIsWebCameraActive(true);
    setWebcamEnabled(true);
  };

  return webcamEnabled ? (
    <>
      <StyledWebCamera ref={webcamRef} screenshotFormat="image/jpg" />
      <ScreenshotButton onClick={handleCapture}>Capture photo</ScreenshotButton>
    </>
  ) : (
    <CameraWrapper>
      <S.UploadSymbol src="Camera.svg" />
      <CameraButton onClick={handleEnableWebcam}>Enable webcam</CameraButton>
    </CameraWrapper>
  );
};
