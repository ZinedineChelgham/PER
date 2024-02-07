import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import Carousel from "react-material-ui-carousel";
import { GraphDataMapper } from "../graphics/GraphDataMapper";
import Chart from "../graphics/Chart";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

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
        <Typography>Contenu de l'onglet Multicritère</Typography>
      </TabPanel>
    </Box>
  );
}

export default Cadre;
