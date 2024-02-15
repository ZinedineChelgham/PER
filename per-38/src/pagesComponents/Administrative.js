import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import TabPanel from "../utilsComponents/TabPanel";
import MonoGraphContainer from "../utilsComponents/MonoGraphContainer";
import DropDown from "../utilsComponents/DropDown";
import BarPlot1 from "../graphics/BarPlotMulti";
import {GraphDataMapper} from "../graphics/GraphDataMapper";

function Administrative() {
    const [checkedGraph, setCheckedGraph] = useState([]); // State to keep track of checked graphs
    const cadreData = GraphDataMapper.enseignement;
    const graphsTitles = ["Temps passé en moyenne par semaine pour les responsabilités administratives","Temps passé en moyenne par semaine pour les responsabilités pédagogiques"];
    const x_axis_Titles = ["Temps passé en moyenne par semaine", "Temps passé en moyenne par semaine"];

    const handleCheckboxChange = (event, items) => {
        console.log("🚀 ~ handleCheckboxChange ~ items:", items);
        setCheckedGraph([...items]);
    };




    const data_graph1 = {
        Overall: {
            '<5': 226,
            '5-8': 213,
            '9-15': 105,
            '>15': 100,
        },
        Sexe: {
            'Un homme': {'<5': 170, '5-8': 159, '9-15': 68, '>15': 70},
            'Une femme': {'<5': 56, '5-8': 54, '9-15': 37, '>15': 30},
        },
        Statut: {
            'Professeur des Universités': {'<5': 54, '5-8': 92, '9-15': 52, '>15': 49},
            'Maître de Conférences (sans HDR)': {'<5': 124, '5-8': 74, '9-15': 32, '>15': 32},
            'Maître de Conférences (avec HDR)': {'<5': 38, '5-8': 41, '9-15': 18, '>15': 14},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<5': 38, '5-8': 70, '9-15': 34, '>15': 38}, 'Une femme': {'<5': 16, '5-8': 22, '9-15': 18, '>15': 11}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<5': 96, '5-8': 60, '9-15': 22, '>15': 21}, 'Une femme': {'<5': 28, '5-8': 14, '9-15': 10, '>15': 11}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<5': 28, '5-8': 24, '9-15': 11, '>15': 6}, 'Une femme': {'<5': 10, '5-8': 17, '9-15': 7, '>15': 8}},
        },
    };


    const data_graph2={
        Overall: {
            '<5': 211,
            '5-8': 263,
            '9-15': 130,
            '>15': 64,
        },
        Sexe: {
            'Un homme': {'<5': 167, '5-8': 186, '9-15': 90, '>15': 36},
            'Une femme': {'<5': 44, '5-8': 77, '9-15': 40, '>15': 28},
        },
        Statut: {
            'Professeur des Universités': {'<5': 88, '5-8': 99, '9-15': 44, '>15': 12},
            'Maître de Conférences (sans HDR)': {'<5': 75, '5-8': 118, '9-15': 55, '>15': 37},
            'Maître de Conférences (avec HDR)': {'<5': 33, '5-8': 44, '9-15': 25, '>15': 13},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<5': 70, '5-8': 71, '9-15': 29, '>15': 7}, 'Une femme': {'<5': 18, '5-8': 28, '9-15': 15, '>15': 5}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<5': 55, '5-8': 88, '9-15': 44, '>15': 22}, 'Une femme': {'<5': 20, '5-8': 30, '9-15': 11, '>15': 15}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<5': 28, '5-8': 26, '9-15': 13, '>15': 6}, 'Une femme': {'<5': 5, '5-8': 18, '9-15': 12, '>15': 7}},
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
                    <BarPlot1
                        data={getDataFromTitle(data)}
                        title={data}
                        x_axis={getXAxisFromIndex(data)}
                    />
                </div>
            ))}
        </div>
    );
}


export default Administrative;
