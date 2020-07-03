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

export const WebCamera = ({ setIsWebCameraActive }) => {
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        console.log(file);
      });
  }, [webcamRef]);

  const handleClick = () => {
    setIsWebCameraActive(true);
    setWebcamEnabled(true);
  };

  return webcamEnabled ? (
    <>
      <StyledWebCamera ref={webcamRef} screenshotFormat="image/jpg" />
      <ScreenshotButton onClick={capture}>Capture photo</ScreenshotButton>
    </>
  ) : (
    <CameraWrapper>
      <S.UploadSymbol src="Camera.svg" />
      <CameraButton onClick={handleClick}>Enable webcam</CameraButton>
    </CameraWrapper>
  );
};
