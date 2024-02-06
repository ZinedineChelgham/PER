import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import PieChart from "./PieChart";
import BarPlot from "./BarPlot";

const Chart = ({
  type,
  data,
  title,
  width = 602,
  height = 418,
  margin = 50,
}) => {
  if (type === "pie") {
    return (
      <PieChart
        data={data}
        title={title}
        width={width}
        height={height}
        margin={margin}
      />
    );
  } else {
    return (
      <BarPlot
        data={data}
        title={title}
        width={width}
        height={height}
        margin={margin}
      />
    );
  }
};

export default Chart;
