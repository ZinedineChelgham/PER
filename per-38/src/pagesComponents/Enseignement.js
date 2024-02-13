import React, { useState } from "react";
import { Tabs, Tab, Typography, Box, Checkbox } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import { GraphDataMapper } from "../graphics/GraphDataMapper";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";
import Grid from "@mui/material/Grid";
import BarPlot1 from "../graphics/BarPlotMulti";

function Enseignement() {
  const [value, setValue] = useState(0);
    const data = {
        Overall: {
            '<50': 177,
            '51-80': 131,
            '81-120': 122,
            '121-150': 73,
            'bcp plus !': 67,
        },
        Sexe: {
            'Un homme': {'<50': 125, '51-80': 97, '81-120': 97, '121-150': 55, 'bcp plus !': 48},
            'Une femme': {'<50': 52, '51-80': 34, '81-120': 25, '121-150': 18, 'bcp plus !': 19},
        },
        Statut: {
            'Professeur des Universités': {'<50': 74, '51-80': 55, '81-120': 40, '121-150': 20, 'bcp plus !': 13},
            'Maître de Conférences (sans HDR)': {'<50': 69, '51-80': 60, '81-120': 62, '121-150': 43, 'bcp plus !': 35},
            'Maître de Conférences (avec HDR)': {'<50': 33, '51-80': 15, '81-120': 18, '121-150': 8, 'bcp plus !': 19},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<50': 54, '51-80': 42, '81-120': 34, '121-150': 11, 'bcp plus !': 8}, 'Une femme': {'<50': 20, '51-80': 13, '81-120': 6, '121-150': 9, 'bcp plus !': 5}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 52, '51-80': 43, '81-120': 47, '121-150': 35, 'bcp plus !': 29}, 'Une femme': {'<50': 17, '51-80': 17, '81-120': 15, '121-150': 8, 'bcp plus !': 6}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 18, '51-80': 11, '81-120': 14, '121-150': 7, 'bcp plus !': 11}, 'Une femme': {'<50': 15, '51-80': 4, '81-120': 4, '121-150': 1, 'bcp plus !': 8}},
        },
    };

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
          <BarPlot1
              data={data}
              title={`Nombre d'heures complémentaires en moyenne ces deux dernières années`}
              x_axis={"Nombre d'heures complémentaires"}
          />


      </TabPanel>
    </Box>
  );
}

export default Enseignement;
