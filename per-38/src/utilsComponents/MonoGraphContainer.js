import React from "react";
import { Typography, Grid, Paper } from "@mui/material"; // Import necessary MUI components
import Icon from "@mui/material/Icon"; // Import MUI Icon component
import MetierAttirant from "../graphics/MetierAttirant";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import IconButton from "@mui/material/IconButton";
import Chart from "../graphics/Chart";
import { useState } from "react";

function MonoGraphContainer({ title, data }) {
  const [graphType, setGraphType] = useState("pie");

  const handleIconClick = (iconName) => {
    setGraphType(iconName);
    console.log(iconName);
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginBottom: 4 }}
      >
        <Grid item xs={12}>
          <Chart type={graphType} title={title} data={data} />
        </Grid>

        <Grid item>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleIconClick("pie")}
          >
            <PieChartIcon
              style={{ fontSize: "inherit", width: "100px", height: "100px" }}
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
              style={{ fontSize: "inherit", width: "100px", height: "100px" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default MonoGraphContainer;
