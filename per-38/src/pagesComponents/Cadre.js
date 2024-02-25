import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { GraphDataMapper } from "../graphics/GraphDataMapper";
import DropDown from "../utilsComponents/DropDown";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";

function Cadre() {
  const [checkedGraph, setCheckedGraph] = useState([]); // State to keep track of checked graphs
  const cadreData = GraphDataMapper.cadre;
  const graphsTitles = cadreData.map((data) => data.title);

  const handleCheckboxChange = (event, items) => {
    console.log("🚀 ~ handleCheckboxChange ~ items:", items);
    setCheckedGraph([...items]);
  };

  const getDataFromTitle = (title) => {
    return cadreData.find((data) => data.title === title).data;
  };

  return (
    <Grid container spacing={2} width="100%" height={"100%"} paddingLeft={2}>
      <Grid item xs={3} height={"100%"}>
        <Typography>Selectionnez une visualisation</Typography>
        <DropDown items={graphsTitles} onSelec={handleCheckboxChange} />
      </Grid>
      <Grid
        item
        container
        xs={9}
        height={"100%"}
        //alignItems={"center"}
        justifyContent={"start"}
        marginTop={4}
      >
        {checkedGraph.map((data, index) => (
          <Grid item key={data} xs={8}>
            <MonoGraphContainer data={getDataFromTitle(data)} title={data} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Cadre;
