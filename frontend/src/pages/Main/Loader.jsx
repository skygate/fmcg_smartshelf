import React from "react";

import * as R from "ramda";
import * as S from "../../components/MainPage";
import Canvas from "../../components/Canvas";
import Results from "./Results";

export const Loader = ({
  shouldHideGif,
  handleDetection,
  handleReset,
  imageToDisplay,
  imageToDetect,
  report,
}) => {
  const missing = countMissing(report.results);
  return (
    <S.ColumnsWrapper>
      {shouldHideGif ? (
        <S.LoaderWrapper>
          <S.GifWrapper src={"loader.gif"} isActive={!shouldHideGif} />
        </S.LoaderWrapper>
      ) : (
        <div className="flex">
          <Canvas
            objects={parseDetectionResultsForCanvas(report.results)}
            imageSrc={imageToDisplay}
          />
          {report.results.length > 0 ? <Results missing={missing} /> : null}
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
};

function parseDetectionResultsForCanvas(results) {
  return results.map(({ x, y, width, height, result }) => ({
    type: "strokeRectangle",
    x,
    y,
    width,
    height,
    color:
      {
        empty: "red",
        full: "green",
        not_full_not_empty: "orange",
        other: "violet",
      }[result] || "black",
  }));
}

function countMissing(results) {
  return R.pipe(
    R.groupBy(({ result }) => result),
    R.map(R.countBy(({ productName }) => productName))
  )(results);
}
