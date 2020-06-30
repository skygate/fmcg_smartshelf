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
  defaultCriticalData,
  defaultNoCriticalData,
  scratchCriticalData,
  scratchNoCritialData,
  recessCriticalData,
  recessNoCritialData,
  defaultCategories,
} from "../constants";

function Statictics() {
  const [startDate, setStartDate] = React.useState(new Date("2019/09/01"));
  const [endDate, setEndDate] = React.useState(new Date("2020/03/01"));
  const [incorrectTimeRange, setIncorrectTimeRange] = React.useState(false);
  const [click, setClick] = React.useState(0);

  const options = {
    title: {
      text: "",
    },
    chart: { width: 950 },
    xAxis: {
      categories: defaultCategories,
    },
    series: [
      {
        type: "column",
        name: "Critical faults",
        color: "#E42900",
        data: defaultCategories.map((item) => defaultCriticalData[item]),
      },
      {
        type: "column",
        name: "Non-critical faults",
        color: "#BCCDDE",
        data: defaultCategories.map((item) => defaultNoCriticalData[item]),
      },
    ],
    legend: {
      align: "right",
      backgroundColor: "#FFFFFF",
      floating: true,
      borderWidth: 0,
      verticalAlign: "top",
      x: 0,
      y: 0,
      reversed: true,
    },
  };

  const getData = (source) =>
    options.xAxis.categories.map((item) => source[item]);

  const renderChart = () => {
    if (startDate <= endDate) {
      const result = eachMonthOfInterval({
        start: startDate,
        end: endDate,
      });
      const newCategories = result.map((item) => months[item.getMonth()]);
      options.xAxis.categories = newCategories;

      if (click === 0) {
        options.series[0].data = getData(defaultCriticalData);
        options.series[1].data = getData(defaultNoCriticalData);
        return <HighchartsReact highcharts={Highcharts} options={options} />;
      }
      if (click === 1) {
        options.series[0].data = getData(scratchCriticalData);
        options.series[1].data = getData(scratchNoCritialData);
        return <HighchartsReact highcharts={Highcharts} options={options} />;
      } else {
        options.series[0].data = getData(recessCriticalData);
        options.series[1].data = getData(recessNoCritialData);
        return <HighchartsReact highcharts={Highcharts} options={options} />;
      }
    }
  };

  const hadleClick = (index) => {
    setClick(index);
  };

  const CustomInput = ({ value, onClick }) => (
    <S.DatePickerWrapper onClick={onClick}>
      {value}
      <S.CalendarIcon src={"CalendarIcon.svg"} alt="calendar icon" />
    </S.DatePickerWrapper>
  );

  return (
    <>
      <S.RowWrapper>
        <S.Title>Anomalies detected</S.Title>
        <S.GenerateRaportWrapper>Generate raport</S.GenerateRaportWrapper>
      </S.RowWrapper>
      {categories.map((item, index) => (
        <S.CategoryButton
          key={item}
          onClick={() => hadleClick(index)}
          active={click === index}
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
        {renderChart()}
      </S.ChartWrapper>
    </>
  );
}

export default Statictics;
