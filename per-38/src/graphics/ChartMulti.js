import React from "react";
import BarPlot1 from "./BarPlotMulti";
import PieChartMulti from "./PieChartMulti";

const ChartMulti = ({
  type,
  data,
  title,
  x_axis,
  width = 602,
  height = 418,
  margin = 50,
}) => {
  if (type === "pie") {
    return (
      <PieChartMulti
        data={data}
        title={title}
        width={width}
        height={height}
        margin={margin}
      />
    );
  } else {
    return (
      <BarPlot1
        data={data}
        title={title}
        x_axis={x_axis}
        width={width}
        height={height}
        margin={margin}
      />
    );
  }
};

export default ChartMulti;
