import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import {GraphDataMapper} from "../graphics/GraphDataMapper";
import DropDown from "../utilsComponents/DropDown";
import BarPlot1 from "../graphics/BarPlotMulti";
import MultiGraphContainer from "../utilsComponents/MultiGraphContainer";

function Recherche() {
    const [checkedGraph, setCheckedGraph] = useState([]); // State to keep track of checked graphs
    const cadreData = GraphDataMapper.enseignement;
    const graphsTitles = ["Quantité de doctorants/stagiaires/... ces 5 dernières années contribuant à votre recherche","Nbe d'heures de recherche disponibles"];
    const x_axis_Titles = ["Quantité de doctorants/stagiaires/...", "Nbe d'heures"];

    const handleCheckboxChange = (event, items) => {
        console.log("🚀 ~ handleCheckboxChange ~ items:", items);
        setCheckedGraph([...items]);
    };




    const data_graph1 = {
        Overall: {
            '0': 57,
            '1': 126,
            '2': 118,
            '3': 135,
            '4': 183,
            '5': 79,
        },
        Sexe: {
            'Un homme': {'0': 40, '1': 92, '2': 85, '3': 79, '4': 137, '5': 69},
            'Une femme': {'0': 17, '1': 34, '2': 33, '3': 56, '4': 46, '5': 10},
        },
        Statut: {
            'Professeur des Universités': {'0': 7, '1': 35, '2': 35, '3': 54, '4': 89, '5': 45},
            'Maître de Conférences (sans HDR)': {'0': 40, '1': 65, '2': 63, '3': 53, '4': 55, '5': 14},
            'Maître de Conférences (avec HDR)': {'0': 7, '1': 22, '2': 15, '3': 23, '4': 35, '5': 17},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'0': 6, '1': 24, '2': 28, '3': 30, '4': 66, '5': 40}, 'Une femme': {'0': 1, '1': 11, '2': 7, '3': 24, '4': 23, '5': 5}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'0': 29, '1': 53, '2': 43, '3': 33, '4': 43, '5': 12}, 'Une femme': {'0': 11, '1': 12, '2': 20, '3': 20, '4': 12, '5': 2}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'0': 3, '1': 12, '2': 10, '3': 12, '4': 24, '5': 14}, 'Une femme': {'0': 4, '1': 10, '2': 5, '3': 11, '4': 11, '5': 3}},
        },
    };


    const data_graph2={
        Overall: {
            '0': 109,
            '1': 236,
            '2': 198,
            '3': 105,
            '4': 46,
            '5': 14,
        },
        Sexe: {
            'Un homme': {'0': 75, '1': 168, '2': 130, '3': 80, '4': 43, '5': 13},
            'Une femme': {'0': 34, '1': 68, '2': 68, '3': 25, '4': 3, '5': 1},
        },
        Statut: {
            'Professeur des Universités': {'0': 33, '1': 95, '2': 74, '3': 42, '4': 16, '5': 5},
            'Maître de Conférences (sans HDR)': {'0': 55, '1': 98, '2': 83, '3': 38, '4': 22, '5': 5},
            'Maître de Conférences (avec HDR)': {'0': 18, '1': 40, '2': 32, '3': 19, '4': 6, '5': 1},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'0': 24, '1': 72, '2': 50, '3': 26, '4': 16, '5': 5}, 'Une femme': {'0': 9, '1': 23, '2': 24, '3': 16, '4': 0, '5': 0}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'0': 38, '1': 72, '2': 53, '3': 33, '4': 20, '5': 5}, 'Une femme': {'0': 17, '1': 26, '2': 30, '3': 5, '4': 2, '5': 0}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'0': 11, '1': 21, '2': 20, '3': 16, '4': 5, '5': 1}, 'Une femme': {'0': 7, '1': 19, '2': 12, '3': 3, '4': 1, '5': 0}},
        },
    };
    const datas = [data_graph1, data_graph2];

    const getDataFromTitle = (title) => {
        // Use the appropriate data based on the selected graph title
        const index = graphsTitles.indexOf(title);
        return datas[index];
    };


    const getXAxisFromIndex = (title) => {
        const index = graphsTitles.indexOf(title);
        return x_axis_Titles[index];
    };



    return (
        <div>
            <Typography>Selectionnez une visualisation</Typography>
            <DropDown items={graphsTitles} onSelec={handleCheckboxChange} />
            {checkedGraph.map((data, index) => (
                <div key={data}>
                    <MultiGraphContainer data={getDataFromTitle(data)}
                                         title={data}
                                         x_axis={getXAxisFromIndex(data)}
                    />
                </div>
            ))}
        </div>
    );
}

export default Recherche;
