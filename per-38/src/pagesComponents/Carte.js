import { Typography } from "@mui/material";
import React from "react";
import FranceMap from "../mapManagement/map";
import data from "../mapManagement/updated_cities4.json";

function Carte() {
  return (
      <div >
      <Typography variant="h4" textAlign={"center"}>
        Réponse des différentes universités
      </Typography>
      <FranceMap data={data.cities} />
    </div>
  );
}

export default Carte;
