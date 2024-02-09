import React, { useState } from "react";
import { Tabs, Tab, Typography, Box, Checkbox } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import { GraphDataMapper } from "../graphics/GraphDataMapper";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";
import Grid from "@mui/material/Grid";
import BarPlot1 from "../graphics/mult";

function Enseignement() {
  const [value, setValue] = useState(0);

  const enseignementData = GraphDataMapper.enseignement;

  const [checkedGraph, setCheckedGraph] = useState({}); // State to keep track of checked graphs

  const handleCheckboxChange = (event, graphTitle) => {
    setCheckedGraph({
      ...checkedGraph,
      [graphTitle]: event.target.checked ? graphTitle : null, // If checked, store graph title; if unchecked, remove from state
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            {enseignementData.map((data, index) => (
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
            {enseignementData.map((data, index) => (
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

export default Enseignement;
