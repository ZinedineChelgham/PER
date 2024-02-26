import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Chart from "../graphics/Chart";
import { GraphDataMapper } from "../graphics/GraphDataMapper";

function Presentation({ handleTabChange }) {
  const getFirstGraphOfEachCategory = () => {
    const categ = Object.keys(GraphDataMapper);
    const firstGraphs = [];
    categ.forEach((cat) => {
      const graph = GraphDataMapper[cat][0];
      if (graph) firstGraphs.push({ graph: graph, category: cat });
    });
    console.log(firstGraphs);
    return firstGraphs;
  };

  return (
    <Grid2
      container
      direction={"row"}
      height={"100%"}
      spacing={12}
      paddingTop={6}
    >
      <Grid2 xs={6} height={"100%"}>
        <Grid2 direction={"column"} paddingLeft={4}>
          <Typography variant="h5" marginBottom={1}>
            Qu'est-ce que c'est ?
          </Typography>
          <Typography marginBottom={2}>
            Le CA de Spécif Campus a, courant 2023, élaboré un questionnaire
            portant sur l’évolution du métier d’enseignant-chercheur basé sur
            cinq axes : généralités, enseignement, recherche, responsabilités
            administratives et carrière.
          </Typography>
          <Typography variant="h5" marginBottom={1}>
            Pourquoi ?
          </Typography>
          <Typography marginBottom={2}>
            Il a été soumis à tous les laboratoires d’informatique dans le but
            de mesurer l'impact que peut avoir l'évolution du métier sur le
            quotidien des interrogés.
          </Typography>
          <Typography variant="h5" marginBottom={1}>
            D'où proviennent ces données ?
          </Typography>
          <Typography marginBottom={2}>
            Les données présentées ici sont issues du traitement des réponses au
            questionnaire.
          </Typography>
          <Typography variant="h5" marginBottom={1}>
            Votre avis compte
          </Typography>
          <Typography>
            Vous pouvez contribuer à l'amélioration de ce site en faisant part
            de vos remarques à l'adresse suivante : <a href="mailto:xx">xx</a>
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2 xs={6} height={"100%"} width={"fit-parent"}>
        <Carousel>
          {getFirstGraphOfEachCategory().map((graph, index) => (
            <Tooltip title="Aller à la page" placement="top">
              <Box
                width={"100%"}
                key={index}
                onClick={(e) => handleTabChange(e, graph.category)}
                sx={{ cursor: "pointer" }}
              >
                <Chart
                  type="pie"
                  data={graph.graph.data}
                  title={graph.graph.title}
                  info={graph.graph.info}
                />
              </Box>
            </Tooltip>
          ))}
        </Carousel>
      </Grid2>
    </Grid2>
  );
}

export default Presentation;
