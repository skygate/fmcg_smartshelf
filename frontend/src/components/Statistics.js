import styled from "styled-components";

import { fontSize, colors } from "../styles/variable";

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 30rem;
  margin-top: 3rem;
`;

export const DateSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22rem;
`;

export const InputWrapper = styled.label`
  display: "flex";
  width: 17rem;
`;

export const DatePickerWrapper = styled.div`
  width: 13rem;
  height: 2rem;
  margin-bottom: 1.25rem;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  color: ${colors.border};
  cursor: pointer;
  padding-left: 0.5rem;
`;

export const CalendarIcon = styled.img`
  padding: 0.5rem;
  border-left: none;
  cursor: pointer;
  margin-left: 6.5rem;
  border-left: 1px solid ${colors.border};
`;

export const Title = styled.div`
  font-size: ${fontSize.biggest};
  margin-left: 1.3rem;
  margin-top: 1.3rem;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const GenerateRaportWrapper = styled.button`
  width: 15rem;
  height: 4.5rem;
  background-color: ${colors.menu};
  border: none;
  color: ${colors.white};
  font-size: ${fontSize.mediumExtended};
  border-radius: 5px;
  margin-top: 2.5rem;
  margin-right: 1.5rem;
`;

export const CategoryButton = styled.button`
  width: 10rem;
  height: 2.5rem;
  background-color: ${({ active }) => (active ? colors.tab : colors.menu)};
  border-radius: 5px;
  border: none;
  font-size: ${fontSize.large};
  color: ${colors.white};
  margin-left: 1.3rem;
`;
