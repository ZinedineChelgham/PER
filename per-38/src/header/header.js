// Header.js

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Header = () => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="home" title="Présentation du projet">

            </Tab>
            <Tab eventKey="profile" title="Cadre général">
            </Tab>
            <Tab eventKey="longer-tab" title="Enseignement">

            </Tab>
            <Tab eventKey="contact" title="Recherche" >

            </Tab>
            <Tab eventKey="contact" title="Administrative" >

            </Tab>
            <Tab eventKey="contact" title="Carte intéractive" >

            </Tab>
        </Tabs>
    );
};

export default Header;
