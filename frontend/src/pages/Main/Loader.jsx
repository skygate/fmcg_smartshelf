import React from "react";

import * as S from "../../components/MainPage";

export const Loader = ({
  shouldHideGif,
  handleDetection,
  handleReset,
  imageToDisplay,
  imageToDetect,
}) => (
  <S.ColumnsWrapper>
    {shouldHideGif ? (
      <S.LoaderWrapper>
        <S.GifWrapper src={"loader.gif"} isActive={!shouldHideGif} />
      </S.LoaderWrapper>
    ) : (
      <S.ResultImage src={imageToDisplay} />
    )}
    <S.ButtonsWrapper>
      <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
      <S.DetectButton onClick={() => handleDetection(imageToDetect)}>
        Run detection
      </S.DetectButton>
    </S.ButtonsWrapper>
  </S.ColumnsWrapper>
);
