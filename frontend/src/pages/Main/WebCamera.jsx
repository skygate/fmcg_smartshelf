import React from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

import { decodeBase64 } from "../../helpers/Base64ToFile";
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

  margin: 0;
  ${mediaQueries.xxl} {
    margin: 0;
  }
`;

const ScreenshotButton = styled.button`
  width: 9.5rem;
  height: 2rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.cameraButtonBorder};
  border-radius: 2px;
  color: ${colors.cameraButtonFont};
  font-weight: 500;
  margin: 0.5rem auto;
`;

export const WebCamera = ({
  setIsWebCameraActive,
  imageSrc,
  setImageSrc,
  setDecodedImage,
}) => {
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const webcamRef = React.useRef(null);

  const handleCapture = React.useCallback(() => {
    const encodedImage = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setImageSrc(webcamRef.current.getScreenshot());
    decodeBase64(encodedImage, setDecodedImage);
  }, [webcamRef]);

  const handleEnableWebcam = () => {
    setIsWebCameraActive(true);
    setWebcamEnabled(true);
  };

  return webcamEnabled ? (
    <>
      <StyledWebCamera ref={webcamRef} screenshotFormat="image/jpeg" />
      <ScreenshotButton onClick={handleCapture}>Capture photo</ScreenshotButton>
    </>
  ) : (
    <CameraWrapper>
      <S.UploadSymbol src="Camera.svg" />
      <CameraButton onClick={handleEnableWebcam}>Enable webcam</CameraButton>
    </CameraWrapper>
  );
};
