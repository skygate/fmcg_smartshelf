import React from "react";

import * as S from "../../components/MainPage";

export const Loader = ({
  hideGif,
  handleDetection,
  handleReset,
  imagePreviewState,
  imageSrc,
  uploadedImage,
  decodedImage,
}) => (
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
