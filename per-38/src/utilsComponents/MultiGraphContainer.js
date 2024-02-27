import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Grid } from "@mui/material"; // Import necessary MUI components
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import ChartMulti from "../graphics/ChartMulti";

function MultiGraphContainer({ title, data, x_axis, info }) {
  const [graphType, setGraphType] = useState("pie");

  const handleIconClick = (iconName) => {
    setGraphType(iconName);
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ marginBottom: 4 }}
    >
      <Grid item xs={12}>
        <ChartMulti
          type={graphType}
          title={title}
          data={data}
          x_axis={x_axis}
          info={info}
        />
      </Grid>

      <Grid item>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleIconClick("pie")}
        >
          <PieChartIcon
            style={{
              fontSize: "inherit",
              width: "100px",
              height: "100px",
              backgroundColor: graphType === "pie" ? "lightgrey" : "white",
            }}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleIconClick("bar")}
        >
          <BarChartIcon
            style={{
              fontSize: "inherit",
              width: "100px",
              height: "100px",
              backgroundColor: graphType === "bar" ? "lightgrey" : "white",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MultiGraphContainer;
