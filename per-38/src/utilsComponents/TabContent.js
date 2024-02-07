import React from "react";
import Administrative from "../pagesComponents/Administrative";
import Cadre from "../pagesComponents/Cadre";
import Carte from "../pagesComponents/Carte";
import Enseignement from "../pagesComponents/Enseignement";
import Presentation from "../pagesComponents/Presentation";
import Recherche from "../pagesComponents/Recherche";

const TabContent = ({ tabKey, handleTabChange }) => {
  switch (tabKey) {
    case "presentation":
      return <Presentation handleTabChange={handleTabChange} />;
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
