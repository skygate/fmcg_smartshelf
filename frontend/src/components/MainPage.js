import styled from "styled-components";
import { Upload, Button } from "antd";

import { colors, fontSize, fontWeight, mediaQueries } from "../styles/variable";

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 2rem;
  background-image: linear-gradient(
    360deg,
    rgb(97, 215, 237),
    rgb(120, 236, 237)
  );
`;

export const UploadAreaWrapper = styled.div`
  margin: 0 auto;
  top: 5rem;
  height: 80vh;
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
  flex-direction: column;

  ${mediaQueries.xl} {
    flex-direction: row;
  }
`;

export const SingelCell = styled.div`
  width: 50%;
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed ${colors.silverSand};
  margin: 4rem auto;
  width: 31.25rem;
  height: 17.5rem;
`;

export const UploadSymbol = styled.img`
  margin: 3rem auto;
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
  font-weight: bold;
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
  margin-top: 1rem;
  font-size: ${fontSize.medium};
`;

export const ResultStatus = styled.div`
  display: flex;
  font-size: ${fontSize.normal};
  margin-top: 0.5rem;
  font-weight: 600;
`;

export const ResultImage = styled.img`
  display: block;
  margin: 3rem auto;
  width: 31.25rem;
  height: 17.5rem;
  background-size: cover;
  padding: 1em 0;
`;

export const ImageWithDamage = styled.img`
  display: block;
  width: 31.25rem;
  height: 17.5rem;
  background-size: cover;
  padding: 1em 0;
`;

export const UploadAndtWrapper = styled(Upload)`
  margin: 0 auto;
`;

export const ResetButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export const DetectButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const GoodStatus = styled(ResultStatus)`
  color: green;
`;

export const FailureStatus = styled(ResultStatus)`
  color: red;
`;
