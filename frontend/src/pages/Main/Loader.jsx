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
          {
            <ul className="alerts">
              {Object.keys(missing).map((productName) => {
                const numberOfEmptySlots = missing[productName];
                const isCritical = numberOfEmptySlots > 1;
                const description = `${productName}: ${numberOfEmptySlots}${
                  isCritical ? " (Needs immediate refill)" : ""
                }`;
                const classes = isCritical ? "critical" : "";
                return (
                  <li className={classes} key={description}>
                    {description}
                  </li>
                );
              })}
            </ul>
          }
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
  return count(results.filter(isEmpty).map(({ productName }) => productName));
}

function isEmpty(detectionResult) {
  return detectionResult.result === "empty";
}

function count(list) {
  const result = {};
  list.forEach((element) => {
    result[element] = (result[element] || 0) + 1;
  });
  return result;
}
