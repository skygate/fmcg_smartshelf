import styled, { css } from "styled-components";
import { Upload, Button } from "antd";

import { colors, fontSize, fontWeight, mediaQueries } from "../styles/variable";

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 0.5rem;
  background-color: ${colors.white};
`;

export const MiddleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xxl} {
    flex-direction: row;
  }
`;

export const SecondColumn = styled.div`
  width: 100%;
`;

export const FirstColumn = styled.div`
  width: 100%;

  ${mediaQueries.xxl} {
    margin-left: 3.75rem;
  }
`;

const ImagesSize = css`
  width: 20rem;
  height: 11.25rem;
  margin: 1rem auto;

  ${mediaQueries.sm} {
    width: 35rem;
    height: 19.7rem;
  }

  ${mediaQueries.md} {
    width: 52rem;
    height: 29rem;
  }

  ${mediaQueries.lg} {
    width: 61rem;
    height: 34rem;
  }

  ${mediaQueries.xxl} {
    width: 60rem;
    margin: 1rem;
    height: 33.75rem;
  }
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed ${colors.silverSand};
  margin: 1rem 0;
  ${ImagesSize};
`;

export const UploadSymbol = styled.img`
  margin: 2rem auto;
  height: 4rem;
  width: 4rem;
  border-radius: 5px;

  ${mediaQueries.sm} {
    margin: 6rem auto 1rem;
  }

  ${mediaQueries.md} {
    margin: 11rem auto 2rem;
    height: 6.25rem;
    width: 6.25rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

export const InputButton = styled.button`
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: ${fontWeight.extraBold};
  display: block;
  margin: 0 auto;
`;

export const UploadInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
`;

export const ResultTitle = styled.div`
  margin: 1rem 2rem;
  font-size: ${fontSize.medium};
`;

export const ResultStatus = styled.div`
  display: flex;
  font-size: ${fontSize.extraLarge};
  margin: 0 2rem;
  font-weight: ${fontWeight.semiBold};
`;

export const ResultImage = styled.img`
  display: block;
  background-size: cover;
  margin: 1rem 0;
  ${ImagesSize}

  ${mediaQueries.xxl} {
    padding: 1em 0 0;
    margin: 1rem auto;
  }
`;

export const ImageWithDamage = styled.img`
  display: block;
  background-size: cover;
  margin: 1rem 0;
  ${ImagesSize};
  ${mediaQueries.xxl} {
    padding: 1em 0 0;
  }
`;

export const UploadAndtWrapper = styled(Upload)`
  margin: 0 auto;
`;

const AndtButton = css`
  display: block;
  font-size: ${fontSize.extraLarge};
  height: 3.5rem;
  background-color: ${colors.menu};
  color: ${colors.white};
  border-radius: 15px;
  text-transform: uppercase;

  &:hover {
    background-color: ${colors.menu};
    color: ${colors.white};
  }
`;

export const ResetButton = styled(Button)`
  margin-right: 1rem;
  ${AndtButton}
`;

export const DetectButton = styled(Button)`
  ${AndtButton}
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-transform: uppercase;

  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export const GoodStatus = styled(ResultStatus)`
  color: ${colors.green};
  margin-left: 2rem;
  margin-bottom: 1rem;
  font-size: ${fontSize.medium};
`;

export const FailureStatus = styled(ResultStatus)`
  color: ${colors.red};
  text-transform: uppercase;
  margin-left: 2rem;
  margin-bottom: 1rem;
  font-size: ${fontSize.medium};
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ListElement = styled.div`
  font-size: ${fontSize.normal};
  margin-right: 0.5rem;
  color: ${({ isActive }) => (isActive ? colors.critical : colors.noCritical)};
`;

export const ListRowsWrapper = styled.div`
  display: flex;
  margin-left: 2rem;
`;

export const GifWrapper = styled(ResultImage)`
  display: ${({ isActive }) => isActive && "none"};
  margin: 0 auto;
  height: 11.25rem;
  width: 11.25rem;

  ${mediaQueries.sm} {
    height: 19.7rem;
    width: 19.7rem;
  }

  ${mediaQueries.md} {
    height: 29rem;
    width: 29rem;
  }

  ${mediaQueries.lg} {
    height: 34rem;
    width: 34rem;
  }

  ${mediaQueries.xxl} {
    height: 33.75rem;
    width: 33.75rem;
  }
`;

export const LoaderWrapper = styled.div`
  ${ImagesSize}

  ${mediaQueries.xxl} {
    margin: 1rem;
    padding: 1em 0 0;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.statusBackground};
  width: fit-content;
  border-radius: 15px;

  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export const StatusTitle = styled.div`
  width: 14rem;
  font-size: ${fontSize.extraLarge};
  background-color: ${colors.statusBackground};
  text-align: center;
  border-radius: 15px;
`;

export const Status = styled.div`
  width: 16rem;
  font-size: ${fontSize.extraLarge};
  background-color: ${({ isGood }) =>
    isGood ? colors.tab : colors.detectiveTab};
  text-align: center;
  border-radius: 15px;
  color: ${colors.white};
  text-transform: uppercase;
`;

export const TableStatus = styled.div`
  color: ${({ isCritical }) =>
    isCritical ? colors.critical : colors.noCritical};
  margin-left: 2rem;
  font-size: ${fontSize.extraLarge};
`;

export const Number = styled.div`
  border: 1px solid
    ${({ isCritical }) => (isCritical ? colors.critical : colors.noCritical)};
  color: ${({ isCritical }) =>
    isCritical ? colors.critical : colors.noCritical};
  border-radius: 5px 0 0 5px;
  font-size: ${fontSize.medium};
  width: 2.25rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Element = styled.div`
  border: 1px solid
    ${({ isCritical }) => (isCritical ? colors.critical : colors.noCritical)};
  color: ${({ isCritical }) =>
    isCritical ? colors.critical : colors.noCritical};
  text-transform: uppercase;
  border-radius: 0 5px 5px 0;
  font-size: ${fontSize.medium};
  width: 9.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;
