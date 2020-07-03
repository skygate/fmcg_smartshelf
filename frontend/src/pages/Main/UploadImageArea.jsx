import React from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import * as S from "../../components/MainPage";
import { getStatus, getPictureWithDamage } from "../../services/UploadImage";
import { WebCamera } from "./WebCamera";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const UploadImageArea = ({ setSuccessStatus, setFailureStatus }) => {
  const [hideGif, setHideGif] = React.useState(false);
  const [dataToSend, setDataToSend] = React.useState(null);
  const [pictureWithDamage, setPictureWithDamage] = React.useState(null);
  const [imagePreviewState, setImagePreviewState] = React.useState(null);
  const [isWebCameraActive, setIsWebCameraActive] = React.useState(false);

  const props = {
    name: "file",
    accept: ".jpg,.png",
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess("Simulating backend response");
      }, 0);
    },
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImagePreviewState(await getBase64(info.file.originFileObj));
        setDataToSend(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleDetection = async () => {
    setHideGif(true);
    const data = new FormData();
    data.append("file", dataToSend);
    setTimeout(() => {
      setHideGif(false);
    }, 2000);
    const response = await getStatus(data);
    if (response.state === "good") {
      return setSuccessStatus(response);
    }
    setFailureStatus(response);
    const picture = await getPictureWithDamage({ filename: response.filename });
    const objectURL = URL.createObjectURL(picture);
    setPictureWithDamage(objectURL);
  };

  const handleReset = () => {
    setImagePreviewState(null);
    setPictureWithDamage(null);
    setFailureStatus(null);
    setSuccessStatus(null);
  };

  if (pictureWithDamage) {
    return (
      <S.ColumnsWrapper>
        <S.ImageWithDamage src={pictureWithDamage}></S.ImageWithDamage>
        <S.ButtonsWrapper>
          <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
          <S.DetectButton onClick={handleDetection}>
            Run detection
          </S.DetectButton>
        </S.ButtonsWrapper>
      </S.ColumnsWrapper>
    );
  }
  if (imagePreviewState) {
    return (
      <S.ColumnsWrapper>
        {hideGif ? (
          <S.LoaderWrapper>
            <S.GifWrapper src={"loader.gif"} isActive={!hideGif} />
          </S.LoaderWrapper>
        ) : (
          <S.ResultImage src={imagePreviewState} />
        )}
        <S.ButtonsWrapper>
          <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
          <S.DetectButton onClick={handleDetection}>
            Run detection
          </S.DetectButton>
        </S.ButtonsWrapper>
      </S.ColumnsWrapper>
    );
  }
  return (
    <S.UploadWrapper>
      <S.SymbolSectionWrapper>
        {!isWebCameraActive && (
          <S.ColumnsWrapper>
            <S.UploadSymbol src="Upload.svg" />
            <S.UploadAndtWrapper {...props}>
              <Button>
                <UploadOutlined /> Click to Upload
              </Button>
            </S.UploadAndtWrapper>
          </S.ColumnsWrapper>
        )}
        <S.ColumnsWrapper>
          <WebCamera setIsWebCameraActive={setIsWebCameraActive} />
        </S.ColumnsWrapper>
      </S.SymbolSectionWrapper>
    </S.UploadWrapper>
  );
};
