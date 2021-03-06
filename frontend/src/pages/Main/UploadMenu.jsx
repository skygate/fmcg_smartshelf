import React from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { WebCamera } from "./WebCamera";
import * as S from "../../components/MainPage";

import { getBase64 } from "../../helpers/FileToBase64";

export const UploadMenu = ({
  isWebCameraActive,
  setImageToDetect,
  setImageToDisplay,
  setIsWebCameraActive,
}) => {
  const uploaderProps = {
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
        setImageToDisplay(await getBase64(info.file.originFileObj));
        setImageToDetect(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <S.UploadWrapper>
      <S.SymbolSectionWrapper>
        {!isWebCameraActive && (
          <S.ColumnsWrapper>
            <S.UploadSymbol src="upload.svg" />
            <S.UploadAndtWrapper {...uploaderProps}>
              <Button>
                <UploadOutlined /> Click to Upload
              </Button>
            </S.UploadAndtWrapper>
          </S.ColumnsWrapper>
        )}
        <S.ColumnsWrapper>
          <WebCamera
            setIsWebCameraActive={setIsWebCameraActive}
            setImageToDetect={setImageToDetect}
            isWebCameraActive={isWebCameraActive}
            setImageToDisplay={setImageToDisplay}
          />
        </S.ColumnsWrapper>
      </S.SymbolSectionWrapper>
    </S.UploadWrapper>
  );
};
