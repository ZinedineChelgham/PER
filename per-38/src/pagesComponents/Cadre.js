import { Box, Tab, Tabs, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { GraphDataMapper } from "../graphics/GraphDataMapper";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";
import TabPanel from "../utilsComponents/TabPanel";

import AcademicProgressChart from "../graphics/AcademicProgressChart";
import BarPlot1 from "../graphics/mult";


function Cadre() {
  const [value, setValue] = useState(0);
  const [checkedGraph, setCheckedGraph] = useState({}); // State to keep track of checked graphs

  const cadreData = GraphDataMapper.cadre;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (event, graphTitle) => {
    setCheckedGraph({
      ...checkedGraph,
      [graphTitle]: event.target.checked ? graphTitle : null, // If checked, store graph title; if unchecked, remove from state
    });
  };

  return (
    <Box sx={{ width: "100%", paddingLeft: 2 }}>
      <Tabs value={value} onChange={handleChange} left>
        <Tab
          label={
            <Typography sx={{ fontWeight: "bold" }}>Monocritère</Typography>
          }
        />
        <Tab
          label={
            <Typography sx={{ fontWeight: "bold" }}>Multicritère</Typography>
          }
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {/* First Row - Checkboxes */}
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            {cadreData.map((data, index) => (
              <>
                <Checkbox
                  value={data.title}
                  checked={checkedGraph[data.title] === data.title}
                  onChange={(e) => handleCheckboxChange(e, data.title)}
                />
                <span>{data.title}</span>
              </>
            ))}
          </Grid>

          {/* Second Row - Graphs */}
          <Grid
            item
            xs={12}
            container
            justifyContent="start"
            alignItems="start"
            direction={"row"}
          >
            {cadreData.map((data, index) => (
              <Grid item key={index} xs={6}>
                {checkedGraph[data.title] && (
                  <MonoGraphContainer data={data.data} title={data.title} />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <BarPlot1></BarPlot1>
      </TabPanel>
    </Box>
  );
}

export default Cadre;
