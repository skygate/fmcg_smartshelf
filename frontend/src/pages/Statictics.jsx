import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { eachMonthOfInterval } from "date-fns";
import { DatePicker } from "antd";

import * as S from "../components/Statistics";
import {
  categories,
  months,
  highchartsDefaultOptions,
  dataByCategory,
} from "../constants";
import { getHistory } from "../services/UploadImage";

const { RangePicker } = DatePicker;

const INITIAL_START_DAY = new Date("2019/09/01");
const INITIAL_END_DAY = new Date("2020/03/01");

function Statictics() {
  const [timeRange, setTimeRange] = React.useState({
    startDate: INITIAL_START_DAY,
    endDate: INITIAL_END_DAY,
  });
  const [startDate, setStartDate] = React.useState(timeRange.startDate);
  const [endDate, setEndDate] = React.useState(timeRange.endDate);
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const [history, setHistory] = useState();

  useEffect(() => {
    getHistory().then(setHistory);
  });

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

      //   const highchartsOptions = formatHighchartsOptions(
      //     highchartsDefaultOptions,
      //     monthsBetween
      //   );

      const highchartsOptions = highchartsDefaultOptions;

      return (
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
      );
    }
  };

  const dateOutsideRange = (min, max) => (date) => date < min || date > max;

  const invalidDate = dateOutsideRange(
    new Date("2019/09/01"),
    new Date("2020/03/01")
  );

  const handleChange = (timeRange) => {
    if (!timeRange) {
      setTimeRange({ startDate: INITIAL_START_DAY, endDate: INITIAL_END_DAY });
      return;
    }
    const [startDate, endDate] = timeRange;
    setStartDate(startDate.toDate());
    endDate && setEndDate(endDate.toDate());
  };

  return (
    <>
      <S.TitleWrapper>
        <S.Title>Anomalies detected</S.Title>
      </S.TitleWrapper>
      {categories.map((item, index) => (
        <S.CategoryButton
          key={item}
          onClick={() => setCategoryIndex(index)}
          active={categoryIndex === index}
        >
          {item}
        </S.CategoryButton>
      ))}
      <S.ChartWrapper>
        {/* <S.DateSelectorWrapper>
          <RangePicker
            picker="month"
            disabledDate={invalidDate}
            onChange={handleChange}
          />
        </S.DateSelectorWrapper> */}
        <S.StyledChart>{renderChart()}</S.StyledChart>
      </S.ChartWrapper>
    </>
  );
}

export default Statictics;
