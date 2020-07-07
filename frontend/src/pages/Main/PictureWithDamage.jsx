import React from "react";

import * as S from "../../components/MainPage";

export const PictureWithDamage = ({ pictureWithDamage, handleReset }) => (
  <S.ColumnsWrapper>
    <S.ImageWithDamage src={pictureWithDamage}></S.ImageWithDamage>
    <S.ButtonsWrapper>
      <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
    </S.ButtonsWrapper>
  </S.ColumnsWrapper>
);
