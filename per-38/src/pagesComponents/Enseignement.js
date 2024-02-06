import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import { GraphDataMapper } from "../graphics/GraphExporter";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";

function Enseignement() {
  const [value, setValue] = useState(0);

  const enseignementData = GraphDataMapper.enseignement;

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
          {enseignementData.map((data, index) => (
            <Box key={index} padding={2} boxSizing="border-box">
              <MonoGraphContainer data={data.data} title={data.title} />
            </Box>
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Contenu de l'onglet Multicritère</Typography>
      </TabPanel>
    </Box>
  );
}

export default Enseignement;
