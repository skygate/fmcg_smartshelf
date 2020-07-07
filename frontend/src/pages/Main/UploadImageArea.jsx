import React from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import * as S from "../../components/MainPage";
import { getStatus, getPictureWithDamage } from "../../services/UploadImage";
import { getBase64 } from "../../helpers/FileToBase64";
import { WebCamera } from "./WebCamera";

export const UploadImageArea = ({ setSuccessStatus, setFailureStatus }) => {
  const [hideGif, setHideGif] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [pictureWithDamage, setPictureWithDamage] = React.useState(null);
  const [imagePreviewState, setImagePreviewState] = React.useState(null);
  const [isWebCameraActive, setIsWebCameraActive] = React.useState(false);
  const [decodedImage, setDecodedImage] = React.useState(null);
  const [imageSrc, setImageSrc] = React.useState(null);

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
        setUploadedImage(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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

  if (imagePreviewState || imageSrc) {
    return (
      <S.ColumnsWrapper>
        {hideGif ? (
          <S.LoaderWrapper>
            <S.GifWrapper src={"loader.gif"} isActive={!hideGif} />
          </S.LoaderWrapper>
        ) : (
          <S.ResultImage src={imagePreviewState || imageSrc} />
        )}
        <S.ButtonsWrapper>
          <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
          <S.DetectButton
            onClick={() => handleDetection(uploadedImage || decodedImage)}
          >
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
          <WebCamera
            setIsWebCameraActive={setIsWebCameraActive}
            imageSrc={imageSrc}
            setDecodedImage={setDecodedImage}
            setImageSrc={setImageSrc}
          />
        </S.ColumnsWrapper>
      </S.SymbolSectionWrapper>
    </S.UploadWrapper>
  );
};
