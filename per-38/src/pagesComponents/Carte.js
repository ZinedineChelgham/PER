import React from "react";
import FranceMap from "../mapManagement/map";
import data from "../mapManagement/updated_cities.json";
import { Typography } from "@mui/material";

function Carte() {
  return (
    <div>
      <Typography variant="h4" textAlign={"center"}>
        Responses per University in France
      </Typography>
      <FranceMap data={data.cities} />
    </div>
  );
}

export default Carte;
