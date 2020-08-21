import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { eachMonthOfInterval } from "date-fns";
import { DatePicker } from "antd";
import * as R from "ramda";
import * as S from "../components/Statistics";
import moment from "moment";

import { legend, highchartsDefaultOptions } from "../constants";
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

  const [[productName, productIndex], setProductIndex] = React.useState([
    "All",
    0,
  ]);

  const [history, setHistory] = useState();

  const results = (history && history.results) || [];

  const midnightBefore = (date) => {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  useEffect(() => {
    getHistory(midnightBefore(new Date()).getTime()).then(setHistory);
  }, []);

  const getUniqueProductNames = (history) =>
    history && history.results
      ? R.uniq(history.results.map(({ productName }) => productName))
      : [];

  const productNames = ["All", ...getUniqueProductNames(history)];

  const groupProductsByTimestamp = (history) =>
    R.groupWith((p1, p2) => p1.timestamp === p2.timestamp, history);

  const countSlotsByResult = (grouped) =>
    grouped.map((group) => [
      group[0].timestamp,
      R.pipe(
        R.groupBy(({ state }) => state),
        R.map(R.length)
      )(group),
    ]);

  const categoriesGroupedByTimestamp = countSlotsByResult(
    groupProductsByTimestamp(
      results.filter((result) => {
        if (productName === "All") {
          return true;
        }

        return result.productName === productName;
      })
    )
  );

  const data = categoriesGroupedByTimestamp.map(([_, data]) =>
    Object.entries(data)
  );

  const getStateNames = (data) => R.uniq(data.map((val) => val[0][0]));

  const stateNames = getStateNames(data);
  const fillEmptyDataWithNulls = (data) =>
    data.map((item) => (item ? item[1] : null));

  const getDataByProductName = (data, productName) =>
    data.map((data) => data.find((item) => item[0] === productName));

  const getConfigData = (name) => {
    const filteredData = data.filter((data) => data.length > 0);
    const dataByProductName = getDataByProductName(filteredData, name);

    return fillEmptyDataWithNulls(dataByProductName);
  };

  const getSeriesData = () =>
    stateNames.reduce(
      (result, name) => ({
        ...result,
        [name]: getConfigData(name),
      }),
      {}
    );

  const formatHighchartsOptions = (highchartsOptions, history, productName) => {
    const categories = getCategories(history);

    const dataConfig = stateNames.map((name) => ({
      type: "column",
      name: legend[name].labelText,
      color: legend[name].color,
      data: getSeriesData(data)[name],
    }));

    return {
      ...highchartsOptions,
      xAxis: {
        categories,
      },
      yAxis: {
        allowDecimals: false,
      },
      series: [...dataConfig],
    };
  };

  const getCategories = () =>
    categoriesGroupedByTimestamp.map(([timestamp, ...rest]) =>
      moment(timestamp).format("LTS")
    );

  const renderChart = () => {
    if (!history) {
      return;
    }

    const productName = "";

    const highchartsOptions = formatHighchartsOptions(
      highchartsDefaultOptions,
      history,
      productName
    );

    return (
      <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
    );
    // }
  };

  // const dateOutsideRange = (min, max) => (date) => date < min || date > max;

  // const invalidDate = dateOutsideRange(
  //   new Date("2019/09/01"),
  //   new Date("2020/03/01")
  // );

  // const handleChange = (timeRange) => {
  //   if (!timeRange) {
  //     setTimeRange({ startDate: INITIAL_START_DAY, endDate: INITIAL_END_DAY });
  //     return;
  //   }
  //   const [startDate, endDate] = timeRange;
  //   setStartDate(startDate.toDate());
  //   endDate && setEndDate(endDate.toDate());
  // };

  return (
    <>
      <S.TitleWrapper>
        <S.Title>{productName}</S.Title>
      </S.TitleWrapper>
      <S.CategoriesWreapper>
        {productNames.map((item, index) => (
          <S.CategoryButton
            key={item}
            onClick={() => setProductIndex([item, index])}
            active={productIndex === index}
          >
            {item}
          </S.CategoryButton>
        ))}
      </S.CategoriesWreapper>
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
