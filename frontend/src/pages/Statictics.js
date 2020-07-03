import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DatePicker from "react-datepicker";
import { eachMonthOfInterval } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import * as S from "../components/Statistics";
import {
  categories,
  months,
  highchartsDefaultOptions,
  dataByCategory,
} from "../constants";

function Statictics() {
  const [startDate, setStartDate] = React.useState(new Date("2019/09/01"));
  const [endDate, setEndDate] = React.useState(new Date("2020/03/01"));
  const [incorrectTimeRange, setIncorrectTimeRange] = React.useState(false);
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const formatHighchartsOptions = (highchartsOptions, monthsBetween) => {
    const categories = monthsBetween.map((item) => months[item.getMonth()]);
    return {
      ...highchartsOptions,
      xAxis: {
        ...monthsBetween.xAxis,
        categories,
      },
      series: highchartsOptions.series.map((seriesElement, i) => ({
        ...seriesElement,
        data: getData(dataByCategory[categoryIndex][i], categories),
      })),
    };
  };

  const getData = (source, categories) =>
    categories.map((item) => source[item]);

  const renderChart = () => {
    if (startDate <= endDate) {
      const monthsBetween = eachMonthOfInterval({
        start: startDate,
        end: endDate,
      });
      const highchartsOptions = formatHighchartsOptions(
        highchartsDefaultOptions,
        monthsBetween
      );

      return (
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
      );
    }
  };

  const hadleClick = (index) => {
    setCategoryIndex(index);
  };

  const CustomInput = ({ value, onClick }) => (
    <S.DatePickerWrapper onClick={onClick}>
      {value}
      <S.CalendarIcon src={"CalendarIcon.svg"} alt="calendar icon" />
    </S.DatePickerWrapper>
  );

  return (
    <>
      <S.TitleWrapper>
        <S.Title>Anomalies detected</S.Title>
        <S.GenerateRaportWrapper>Generate raport</S.GenerateRaportWrapper>
      </S.TitleWrapper>
      {categories.map((item, index) => (
        <S.CategoryButton
          key={item}
          onClick={() => hadleClick(index)}
          active={categoryIndex === index}
        >
          {item}
        </S.CategoryButton>
      ))}
      <S.ChartWrapper>
        <S.DateSelectorWrapper>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            minDate={new Date("2019/09/01")}
            maxDate={new Date("2020/03/01")}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            customInput={<CustomInput />}
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={new Date("2019/09/01")}
            maxDate={new Date("2020/03/01")}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            customInput={<CustomInput />}
          />
        </S.DateSelectorWrapper>
        {incorrectTimeRange && <h1>Incorrect time range</h1>}
        <S.StyledChart>{renderChart()}</S.StyledChart>
      </S.ChartWrapper>
    </>
  );
}

export default Statictics;
