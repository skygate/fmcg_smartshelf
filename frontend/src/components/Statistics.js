import styled from "styled-components";

import { fontSize, colors, mediaQueries } from "../styles/variable";
import { RowsWrapper } from "./MainPage";

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 30rem;
  margin-top: 3rem;

  ${mediaQueries.xxl} {
    flex-direction: row;
  }
`;

export const DateSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: 18rem;

  ${mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    width: 22rem;
  }

  ${mediaQueries.xxl} {
    flex-direction: column;
    margin-left: 0;
  }
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

  ${mediaQueries.sm} {
    margin-top: 2.5rem;
    margin-right: 1.5rem;
  }
`;

export const CategoriesWreapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button`
  background-color: ${({ active }) => (active ? colors.tab : colors.menu)};
  border-radius: 5px;
  border: none;
  font-size: ${fontSize.base};
  color: ${colors.white};
  margin-left: 1.3rem;
  margin-top: 0.5rem;
  padding: 5px 15px;
  cursor: pointer;
`;

export const TitleWrapper = styled(RowsWrapper)`
  flex-direction: column;

  ${mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StyledChart = styled.div`
  width: 95vw;
`;
