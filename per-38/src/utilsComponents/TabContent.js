import React from "react";
import { Typography } from "@mui/material";
import Administrative from "../pagesComponents/Administrative";
import Enseignement from "../pagesComponents/Enseignement";
import Recherche from "../pagesComponents/Recherche";
import Cadre from "../pagesComponents/Cadre";
import Presentation from "../pagesComponents/Presentation";
import Carte from "../pagesComponents/Carte";

const TabContent = ({ tabKey }) => {
  switch (tabKey) {
    case "presentation":
      return <Presentation />;
    case "cadre":
      return <Cadre />;
    case "enseignement":
      return <Enseignement />;
    case "recherche":
      return <Recherche />;
    case "administrative":
      return <Administrative />;
    case "carte":
      return <Carte />;
    // Add cases for other tab keys as needed
    default:
      return null;
  }
};

export default TabContent;
