import React, { useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import "./App.css";
import TabContent from "./utilsComponents/TabContent";

function App() {
  const [activeTab, setActiveTab] = useState("presentation");

  const handleTabChange = (event, tabKey) => {
    setActiveTab(tabKey);
  };

  // Define a common style object for tabs
  const tabStyle = {
    textTransform: "none",
    fontSize: "1.2rem",
    // Add other common styles if needed
  };

  return (
    <div className="App">
      <Typography variant="h2" textAlign={"center"} marginBottom={3}>
        Specif campus visualization
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{ marginBottom: 3 }}
      >
        <Tab
          label="Présentation du projet"
          value="presentation"
          sx={tabStyle}
        />
        <Tab label="Cadre général" value="cadre" sx={tabStyle} />
        <Tab label="Enseignement" value="enseignement" sx={tabStyle} />
        <Tab label="Recherche" value="recherche" sx={tabStyle} />
        <Tab label="Administrative" value="administrative" sx={tabStyle} />
        <Tab label="Carte intéractive" value="carte" sx={tabStyle} />
      </Tabs>

      <TabContent tabKey={activeTab} />
    </div>
  );
}

export default App;
