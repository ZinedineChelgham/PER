import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import PieChart from "../graphics/PieChart";
import MetierAttirant from "../graphics/MetierAttirant";
import Carousel from "react-material-ui-carousel";

const data = [
  { category: "Pas du tout", percentage: 5.59 },
  { category: "Plutôt pas", percentage: 7.49 },
  { category: "Moyennement", percentage: 18.12 },
  { category: "Un peu", percentage: 35.01 },
  { category: "Tout à fait", percentage: 33.24 },
];
const title = "Métier toujours intéressant ?";

const carouselItems = [
    {
        id: 1,
        component: <PieChart data={data} title={title} />, // PieChart component as an item
    },
    {
        id: 2,
        component: <MetierAttirant />, // MetierAttirant component as an item
    },
    // ... you can add more items if needed
];
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
          <Box width={"100%"}>
              <Carousel>
                  {carouselItems.map((item) => (
                      <Box key={item.id} padding={2} boxSizing="border-box">
                          {item.component}
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
