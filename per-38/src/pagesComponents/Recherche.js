import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";

function Recherche() {
  const [value, setValue] = useState(0);

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
        <Typography>Contenu de l'onglet Monocritère</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Contenu de l'onglet Multicritère</Typography>
      </TabPanel>
    </Box>
  );
}

export default Recherche;
