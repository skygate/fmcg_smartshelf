import React, { useState } from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import * as S from "./components/MainPage";
import { getStatus, getPictureWithDamage } from "./services/UploadImage";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function App() {
  const [imagePreviewState, setImagePreviewState] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
  const [pictureWithDamage, setPictureWithDamage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);
  const [failureStatus, setFailureStatus] = useState(null);
  const [hideGif, setHideGif] = useState(false);

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
    setHideGif(true);
    const data = new FormData();
    data.append("file", dataToSend);
    setTimeout(() => {
      setHideGif(false);
    }, 2000);
    const response = await getStatus(data);
    if (response.state === "good") {
      setSuccessStatus(response);
      return;
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

  const renderImage = () => {
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
        <S.UploadSymbol src="upload.svg" />
        <S.UploadAndtWrapper {...props}>
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </S.UploadAndtWrapper>
      </S.UploadWrapper>
    );
  };

  return (
    <S.PageWrapper>
      <S.UploadAreaWrapper>
        <S.TitleWrapper>
          <S.Title>Upload File</S.Title>
        </S.TitleWrapper>

        <S.MiddleSectionWrapper>
          <S.SingelCell>
            <S.ResultTitle>Result:</S.ResultTitle>
            {successStatus && (
              <>
                <S.ResultStatus>No damage detected</S.ResultStatus>
                <S.ResultStatus>{`Object: ${successStatus.type}`}</S.ResultStatus>
                <S.GoodStatus>{`State: ${successStatus.state}`}</S.GoodStatus>
              </>
            )}

            {failureStatus && (
              <S.ColumnsWrapper>
                <div>
                  <S.ResultStatus>{`Object: ${failureStatus.type}`}</S.ResultStatus>
                  <S.FailureStatus>{`State: ${failureStatus.state}`}</S.FailureStatus>
                </div>
                <S.ColumnsWrapper>
                  {Object.entries(failureStatus.defects).map(([key, value]) => (
                    <S.ListRowsWrapper key={key}>
                      <S.ListElement isActive={value === "recess"}>
                        {key}
                      </S.ListElement>
                      <S.ListElement isActive={value === "recess"}>
                        {"-"}
                      </S.ListElement>
                      <S.ListElement isActive={value === "recess"}>
                        {value}
                      </S.ListElement>
                    </S.ListRowsWrapper>
                  ))}
                </S.ColumnsWrapper>
              </S.ColumnsWrapper>
            )}
          </S.SingelCell>
          <S.SingelCell>{renderImage()}</S.SingelCell>
        </S.MiddleSectionWrapper>
      </S.UploadAreaWrapper>
    </S.PageWrapper>
  );
}

export default App;
