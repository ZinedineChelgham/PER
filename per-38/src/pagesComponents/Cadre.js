import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import PieChart from "../graphics/PieChart";

const data = [
  { category: "Pas du tout", percentage: 5.59 },
  { category: "Plutôt pas", percentage: 7.49 },
  { category: "Moyennement", percentage: 18.12 },
  { category: "Un peu", percentage: 35.01 },
  { category: "Tout à fait", percentage: 33.24 },
];
const title = "Métier toujours intéressant ?";
function Cadre() {
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
        <PieChart data={data} title={title} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Contenu de l'onglet Multicritère</Typography>
      </TabPanel>
    </Box>
  );
}

export default Cadre;
