import React, { useState } from "react";
import "antd/dist/antd.css";

import * as S from "../../components/MainPage";
import { UploadImageArea } from "./UploadImageArea";

function Main() {
  const [successStatus, setSuccessStatus] = useState(null);
  const [failureStatus, setFailureStatus] = useState(null);
  const criticalDamages =
    failureStatus &&
    Object.values(failureStatus.defects).find(({ is_critical }) => is_critical);
  const noDamages =
    failureStatus &&
    Object.values(failureStatus.defects).find(
      ({ is_critical }) => !is_critical
    );

  return (
    <S.PageWrapper>
      <S.MiddleSectionWrapper>
        <S.FirstColumn>
          <S.StatusWrapper>
            <S.StatusTitle>STATUS</S.StatusTitle>
            {successStatus && (
              <S.Status isGood={true}>{successStatus.state}</S.Status>
            )}
            {failureStatus && <S.Status>{failureStatus.state}</S.Status>}
          </S.StatusWrapper>
          <UploadImageArea
            setFailureStatus={setFailureStatus}
            setSuccessStatus={setSuccessStatus}
          />
        </S.FirstColumn>
        <S.SecondColumn>
          {failureStatus && (
            <S.ColumnsWrapper>
              <S.ResultStatus>{`Object: ${failureStatus.type}`}</S.ResultStatus>
              <S.ColumnsWrapper>
                {criticalDamages && (
                  <S.TableStatus isCritical={true}>CRITICAL</S.TableStatus>
                )}
                {Object.entries(failureStatus.defects).map(
                  ([key, values]) =>
                    values.is_critical && (
                      <S.ListRowsWrapper key={key}>
                        <S.Number isCritical={true}>{key}</S.Number>
                        <S.Element isCritical={true}>
                          {values.defect_type}
                        </S.Element>
                      </S.ListRowsWrapper>
                    )
                )}

                {noDamages && <S.TableStatus>CHECK</S.TableStatus>}
                {Object.entries(failureStatus.defects).map(
                  ([key, values]) =>
                    !values.is_critical && (
                      <S.ListRowsWrapper key={key}>
                        <S.Number>{key}</S.Number>
                        <S.Element>{values.defect_type}</S.Element>
                      </S.ListRowsWrapper>
                    )
                )}
              </S.ColumnsWrapper>
            </S.ColumnsWrapper>
          )}
        </S.SecondColumn>
      </S.MiddleSectionWrapper>
    </S.PageWrapper>
  );
}

export default Main;
