import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import Typography from "@mui/material/Typography";
import map from "../assets/images/map.png";

function Presentation() {
  return (
    <Grid2 container direction={"row"} height={"100%"} spacing={12}>
      <Grid2 xs={6} height={"100%"}>
        <Grid2 direction={"column"}>
          <Typography variant="h6" marginBottom={1}>
            Qu'est-ce que c'est ?
          </Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          eveniet exercitationem pariatur. Animi dolorum harum reprehenderit?
          Accusamus amet libero tempora accusantium corporis, deserunt,
          molestiae quo soluta id aut, maxime velit.
          <Typography variant="h6" marginBottom={1}>
            Pourquoi ?
          </Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          eveniet exercitationem pariatur. Animi dolorum harum reprehenderit?
          Accusamus amet libero tempora accusantium corporis, deserunt,
          molestiae quo soluta id aut, maxime velit.
          <Typography variant="h6" marginBottom={1}>
            D'où proviennent ces données ?
          </Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          eveniet exercitationem pariatur. Animi dolorum harum reprehenderit?
          Accusamus amet libero tempora accusantium corporis, deserunt,
          molestiae quo soluta id aut, maxime velit.
          <Typography variant="h6" marginBottom={1}>
            Votre avis compte
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2 xs={6} height={"100%"}>
        <img src={map} alt="" />
      </Grid2>
    </Grid2>
  );
}

export default Presentation;
