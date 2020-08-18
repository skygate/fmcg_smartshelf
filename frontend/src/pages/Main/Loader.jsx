import React from "react";

import * as S from "../../components/MainPage";
import Canvas from "../../components/Canvas";

export const Loader = ({
  shouldHideGif,
  handleDetection,
  handleReset,
  imageToDisplay,
  imageToDetect,
  report,
}) => (
  <S.ColumnsWrapper>
    {shouldHideGif ? (
      <S.LoaderWrapper>
        <S.GifWrapper src={"loader.gif"} isActive={!shouldHideGif} />
      </S.LoaderWrapper>
    ) : (
      <div className="flex-full">
        <Canvas
          objects={parseDetectionResultsForCanvas(report.results)}
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

function parseDetectionResultsForCanvas(results) {
  return results.map(({ leftUpper, rightLower, result }) => ({
    type: "strokeRectangle",
    x: leftUpper.x,
    y: leftUpper.y,
    width: rightLower.x - leftUpper.x,
    height: rightLower.y - leftUpper.y,
    color:
      {
        empty: "red",
        full: "green",
        not_full_not_empty: "orange",
        other: "violet",
      }[result] || "black",
  }));
}
