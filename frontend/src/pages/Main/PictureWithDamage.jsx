import React from "react";

import * as S from "../../components/MainPage";

export const PictureWithDamage = ({
  pictureWithDamage,
  handleReset,
  handleDetection,
}) => (
  <S.ColumnsWrapper>
    <S.ImageWithDamage src={pictureWithDamage}></S.ImageWithDamage>
    <S.ButtonsWrapper>
      <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
      <S.DetectButton onClick={handleDetection}>Run detection</S.DetectButton>
    </S.ButtonsWrapper>
  </S.ColumnsWrapper>
);
