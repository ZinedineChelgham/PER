import { Typography } from "@mui/material";
import React from "react";
import FranceMap from "../mapManagement/map";
import data from "../mapManagement/updated_cities3.json";

function Carte() {
  return (
    <div>
      <Typography variant="h4" textAlign={"center"}>
        Réponse des différentes universités en france
      </Typography>
      <FranceMap data={data.cities} />
    </div>
  );
}

export default Carte;
