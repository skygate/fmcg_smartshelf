import React from "react";
import "antd/dist/antd.css";

import * as S from "../../components/MainPage";
import { UploadImageArea } from "./UploadImageArea";
import { STATUSES } from "../../constants";
import { ReportContext } from "../../context/ReportContext";

function Main() {
  const { report } = React.useContext(ReportContext);

  const criticalDamages =
    report.defects &&
    Object.values(report.defects).find(({ is_critical }) => is_critical);

  const noDamages =
    report.defects &&
    Object.values(report.defects).find(({ is_critical }) => !is_critical);

  return (
    <S.PageWrapper>
      <S.MiddleSectionWrapper>
        <S.FirstColumn>
          <S.StatusWrapper>
            <S.StatusTitle>STATUS</S.StatusTitle>
            {report.state && (
              <S.Status isGood={report.state === STATUSES.SUCCESS}>
                {report.state}
              </S.Status>
            )}
          </S.StatusWrapper>
          <UploadImageArea />
        </S.FirstColumn>
        <S.SecondColumn>
          {report?.defects && (
            <S.ColumnsWrapper>
              <S.ColumnsWrapper>
                {criticalDamages && (
                  <S.TableStatus isCritical={true}>CRITICAL</S.TableStatus>
                )}
                {Object.entries(report.defects).map(
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
                {Object.entries(report.defects).map(
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
