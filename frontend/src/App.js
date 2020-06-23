import React, { useState } from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import * as S from "./components/MainPage";
import { getStatus, getPictureWithDamage } from "./services/UploadImage";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function App() {
  const [imagePreviewState, setImagePreviewState] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
  const [status, setStatus] = useState(false);
  const [pictureWithDamage, setPictureWithDamage] = useState(null);
  const [failureStatus, setFailureStatus] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  const props = {
    name: "file",
    accept: ".jpg,.png",
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    // action: "https://run.mocky.io/v3/332f05dd-8544-4bcb-9be5-f75d5907e424",
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
      }
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
    const data = new FormData();
    data.append("file", dataToSend);
    const response = await getStatus(data);

    if (response.state === "good") {
      setSuccessStatus(response);
      setStatus(true);
      return;
    }
    setFailureStatus(response);
    const picture = await getPictureWithDamage();
    const objectURL = URL.createObjectURL(picture);
    setPictureWithDamage(objectURL);
  };

  const handleReset = () => {
    setImagePreviewState(null);
    setStatus(null);
    setPictureWithDamage(null);
  };

  return (
    <S.PageWrapper>
      <S.UploadAreaWrapper>
        <S.TitleWrapper>
          <S.Title>Upload File</S.Title>
        </S.TitleWrapper>

        <S.MiddleSectionWrapper>
          <S.SingelCell>
            {imagePreviewState ? (
              <>
                <S.ResultImage src={imagePreviewState} />
                <S.ButtonsWrapper>
                  <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
                  <S.DetectButton onClick={handleDetection}>
                    Run detection
                  </S.DetectButton>
                </S.ButtonsWrapper>
              </>
            ) : (
              <S.UploadWrapper>
                <S.UploadSymbol src="upload.svg" />
                <S.UploadAndtWrapper {...props}>
                  <Button>
                    <UploadOutlined /> Click to Upload
                  </Button>
                </S.UploadAndtWrapper>
              </S.UploadWrapper>
            )}
          </S.SingelCell>

          <S.SingelCell>
            <S.ResultTitle>Result:</S.ResultTitle>
            {status && (
              <>
                <S.ResultStatus>No damage detected</S.ResultStatus>
                <S.ResultStatus>{`Object: ${successStatus.type}`}</S.ResultStatus>
                <S.GoodStatus>{`State: ${successStatus.state}`}</S.GoodStatus>
              </>
            )}

            {pictureWithDamage && (
              <>
                <S.ImageWithDamage src={pictureWithDamage}></S.ImageWithDamage>
                <S.ResultStatus>{`Object: ${failureStatus.type}`}</S.ResultStatus>
                <S.FailureStatus>{`State: ${failureStatus.state}`}</S.FailureStatus>
              </>
            )}
          </S.SingelCell>
        </S.MiddleSectionWrapper>
      </S.UploadAreaWrapper>
    </S.PageWrapper>
  );
}

export default App;
