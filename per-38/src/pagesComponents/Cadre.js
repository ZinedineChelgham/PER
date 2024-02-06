import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import Carousel from "react-material-ui-carousel";
import { GraphDataMapper } from "../graphics/GraphExporter";
import Chart from "../graphics/Chart";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";

function Cadre() {
  const [value, setValue] = useState(0);

  const cadreData = GraphDataMapper.cadre;

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
        <Box width={"100%"}>
          <Carousel>
            {cadreData.map((data, index) => (
              <Box key={index} padding={2} boxSizing="border-box">
                <MonoGraphContainer data={data.data} title={data.title} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Contenu de l'onglet Multicritère</Typography>
      </TabPanel>
    </Box>
  );
}

export default Cadre;
