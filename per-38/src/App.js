import { Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import logoSpecif from "./assets/images/logoSpecif.png";
import TabContent from "./utilsComponents/TabContent";

function App() {
  const [activeTab, setActiveTab] = useState("presentation");

  const handleTabChange = (e, tabKey) => {
    //event remvoed
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
      <img src={logoSpecif} alt="logo" />
      <Typography
        display={"inline-block"}
        variant="h2"
        textAlign={"center"}
        marginBottom={3}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          position: "absolute",
          top: "30px",
        }}
      >
        <span style={{ color: "#c80909" }}>Specif </span>campus viz
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
        <Tab label="Administratif" value="administrative" sx={tabStyle} />
        <Tab label="Carte intéractive" value="carte" sx={tabStyle} />
      </Tabs>

      <TabContent tabKey={activeTab} handleTabChange={handleTabChange} />
    </div>
  );
}

export default App;
