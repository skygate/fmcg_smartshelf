import styled from "styled-components";
import { Upload, Button } from "antd";

import { colors, fontSize, fontWeight } from "../styles/variable";

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 2rem;
  background-image: linear-gradient(360deg, rgb(53, 53, 53), rgb(88, 88, 88));
`;

export const UploadAreaWrapper = styled.div`
  margin: 0 auto;
  top: 5rem;
  min-height: 90vh;
  width: 90vw;
  border: 1px solid ${colors.silverSand};
  border-radius: 5px;
  background-color: ${colors.white};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  border-bottom: 1px solid ${colors.silverSand};
`;

export const Title = styled.div`
  font-size: ${fontSize.large};
  width: fit-content;
  margin-left: 6rem;
`;

export const MiddleSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SingelCell = styled.div`
  width: 100%;
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed ${colors.silverSand};
  margin: 1rem;
  width: 60rem;
  height: 33.75rem;
`;

export const UploadSymbol = styled.img`
  margin: 11rem auto 2rem;
  height: 6.25rem;
  width: 6.25rem;
  border-radius: 5px;
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
  font-size: ${fontSize.normal};
  margin: 0 2rem;
  font-weight: ${fontWeight.semiBold};
`;

export const ResultImage = styled.img`
  display: block;
  margin: 1rem;
  width: 60rem;
  height: 33.75rem;
  background-size: cover;
  padding: 1em 0 0;
`;

export const ImageWithDamage = styled.img`
  display: block;
  margin: 1rem;
  width: 60rem;
  height: 33.75rem;
  background-size: cover;
  padding: 1em 0 0;
`;

export const UploadAndtWrapper = styled(Upload)`
  margin: 0 auto;
`;

export const ResetButton = styled(Button)`
  display: block;
  margin-right: 1rem;
`;

export const DetectButton = styled(Button)`
  display: block;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const GoodStatus = styled(ResultStatus)`
  color: ${colors.green};
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

export const FailureStatus = styled(ResultStatus)`
  color: ${colors.red};
  text-transform: uppercase;
  margin-left: 2rem;
  margin-bottom: 1rem;
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
  color: ${({ isActive }) => (isActive ? colors.recess : colors.scratches)};

  :last-child {
    font-weight: ${fontWeight.extraBold};
  }
`;

export const ListRowsWrapper = styled.div`
  display: flex;
  margin-left: 2rem;
`;

export const GifWrapper = styled(ResultImage)`
  display: ${({ isActive }) => isActive && "none"};
  height: 26.5rem;
  width: 26.5rem;
  margin: 0 auto;
`;
