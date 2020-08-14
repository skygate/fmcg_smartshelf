import React from "react";

import * as S from "../../components/MainPage";
import Canvas from "../../components/Canvas";

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
      <div style={{ display: "flex", flex: "1 1 auto" }}>
        <Canvas
          objects={[
            {
              type: "strokeRectangle",
              color: "red",
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            },
            {
              type: "strokeRectangle",
              color: "red",
              x: 100,
              y: 0,
              width: 100,
              height: 100,
            },
          ]}
          imageSrc={imageToDisplay}
        />
      </div>
    )}
    <S.ButtonsWrapper>
      <S.ResetButton onClick={handleReset}>Reset</S.ResetButton>
      <S.DetectButton onClick={() => handleDetection(imageToDetect)}>
        Run detection
      </S.DetectButton>
    </S.ButtonsWrapper>
  </S.ColumnsWrapper>
);
