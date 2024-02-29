import { Typography } from "@mui/material";
import React, { useState } from "react";
import { GraphDataMapper } from "../utils/GraphDataMapper";
import DropDown from "../utilsComponents/DropDown";
import MultiGraphContainer from "../utilsComponents/MultiGraphContainer";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";

function Enseignement() {
  const [checkedGraph, setCheckedGraph] = useState([]);
  const cadreData = GraphDataMapper.enseignement;

  const handleCheckboxChange = (event, items) => {
    setCheckedGraph([...items]);
  };

  const getDataFromTitle = (title) => {
    // Find the data corresponding to the given title
    const data = cadreData.find((item) => item.title === title);
    return data ? data.data : null;
  };

  const getXAxisFromIndex = (title) => {
    // Find the x axis title corresponding to the given title
    const data = cadreData.find((item) => item.title === title);
    return data ? data.x_axis_Titles : null;
  };

  const getInfosFromTitle = (title) => {
    return cadreData.find((data) => data.title === title).info;
  };

  return (
      <div>
        <Typography>Selectionnez une visualisation</Typography>
        <DropDown
            items={cadreData.map((item) => item.title)}
            onSelec={handleCheckboxChange}
        />
        {checkedGraph.map((title) => {
          const graph = cadreData.find((item) => item.title === title);
          if (graph && graph.type === "monocritere") {
            return (
                <div key={title}>
                  <MonoGraphContainer
                      data={getDataFromTitle(title)}
                      title={title}
                      info={getInfosFromTitle(title)}
                  />
                </div>
            );
          } else if (graph && graph.type === "multicritere") {
            return (
                <div key={title}>
                  <MultiGraphContainer
                      data={getDataFromTitle(title)}
                      title={title}
                      x_axis={getXAxisFromIndex(title)}
                      info={getInfosFromTitle(title)}
                  />
                </div>
            );
          }
          return undefined;
        })}
      </div>
  );
}

export default Enseignement;
