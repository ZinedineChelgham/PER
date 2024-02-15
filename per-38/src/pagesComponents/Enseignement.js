import React, { useState } from "react";
import { Typography } from "@mui/material";
import DropDown from "../utilsComponents/DropDown";
import BarPlot1 from "../graphics/BarPlotMulti";
import { GraphDataMapper } from "../graphics/GraphDataMapper";

function Enseignement() {
    const [checkedGraph, setCheckedGraph] = useState([]); // State to keep track of checked graphs
    const cadreData = GraphDataMapper.enseignement;
    const graphsTitles = ["Nombre d'heures complémentaires en moyenne ces deux dernières années", "Nombre d'heures complémentaires en moyenne ces cinq dernières années","Nombre moyen d'étudiants inscrits sur Formation informatique","Nombre moyen d'étudiants inscrits sur les autres formations"];
    const x_axis_Titles = ["Nombre d'heures complémentaires", "Nombre d'heures complémentaires","Nombre d'étudiants", "Nombre d'étudiants"];

    const handleCheckboxChange = (event, items) => {
        console.log("🚀 ~ handleCheckboxChange ~ items:", items);
        setCheckedGraph([...items]);
    };

    const data_graph1 = {
        Overall: {
            '<50': 177,
            '51-80': 131,
            '81-120': 122,
            '121-150': 73,
            'bcp plus !': 67,
        },
        Sexe: {
            'Un homme': {'<50': 125, '51-80': 97, '81-120': 97, '121-150': 55, 'bcp plus !': 48},
            'Une femme': {'<50': 52, '51-80': 34, '81-120': 25, '121-150': 18, 'bcp plus !': 19},
        },
        Statut: {
            'Professeur des Universités': {'<50': 74, '51-80': 55, '81-120': 40, '121-150': 20, 'bcp plus !': 13},
            'Maître de Conférences (sans HDR)': {'<50': 69, '51-80': 60, '81-120': 62, '121-150': 43, 'bcp plus !': 35},
            'Maître de Conférences (avec HDR)': {'<50': 33, '51-80': 15, '81-120': 18, '121-150': 8, 'bcp plus !': 19},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<50': 54, '51-80': 42, '81-120': 34, '121-150': 11, 'bcp plus !': 8}, 'Une femme': {'<50': 20, '51-80': 13, '81-120': 6, '121-150': 9, 'bcp plus !': 5}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 52, '51-80': 43, '81-120': 47, '121-150': 35, 'bcp plus !': 29}, 'Une femme': {'<50': 17, '51-80': 17, '81-120': 15, '121-150': 8, 'bcp plus !': 6}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 18, '51-80': 11, '81-120': 14, '121-150': 7, 'bcp plus !': 11}, 'Une femme': {'<50': 15, '51-80': 4, '81-120': 4, '121-150': 1, 'bcp plus !': 8}},
        },
    };

    const data_graph2 = {
        Overall: {
            '<50': 139,
            '51-80': 118,
            '81-120': 151,
            '121-150': 82,
            'bcp plus !': 60,
        },
        Sexe: {
            'Un homme': {'<50': 101, '51-80': 81, '81-120': 122, '121-150': 55, 'bcp plus !': 46},
            'Une femme': {'<50': 38, '51-80': 37, '81-120': 29, '121-150': 27, 'bcp plus !': 14},
        },
        Statut: {
            'Professeur des Universités': {'<50': 58, '51-80': 54, '81-120': 46, '121-150': 22, 'bcp plus !': 12},
            'Maître de Conférences (sans HDR)': {'<50': 52, '51-80': 54, '81-120': 74, '121-150': 47, 'bcp plus !': 34},
            'Maître de Conférences (avec HDR)': {'<50': 28, '51-80': 10, '81-120': 26, '121-150': 13, 'bcp plus !': 14},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<50': 41, '51-80': 42, '81-120': 39, '121-150': 9, 'bcp plus !': 9}, 'Une femme': {'<50': 17, '51-80': 12, '81-120': 7, '121-150': 13, 'bcp plus !': 3}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 44, '51-80': 33, '81-120': 57, '121-150': 37, 'bcp plus !': 28}, 'Une femme': {'<50': 8, '51-80': 21, '81-120': 17, '121-150': 10, 'bcp plus !': 6}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 15, '51-80': 6, '81-120': 21, '121-150': 9, 'bcp plus !': 9}, 'Une femme': {'<50': 13, '51-80': 4, '81-120': 5, '121-150': 4, 'bcp plus !': 5}},
        },
    };


    const data_graph3 = {
        Overall: {
            '<50': 67,
            '50-100': 73,
            '101-150': 57,
            '151-200': 80,
            '>200': 402,
        },
        Sexe: {
            'Un homme': {'<50': 49, '50-100': 55, '101-150': 44, '151-200': 54, '>200': 291},
            'Une femme': {'<50': 18, '50-100': 18, '101-150': 13, '151-200': 26, '>200': 111},
        },
        Statut: {
            'Professeur des Universités': {'<50': 18, '50-100': 24, '101-150': 20, '151-200': 29, '>200': 165},
            'Maître de Conférences (sans HDR)': {'<50': 26, '50-100': 35, '101-150': 25, '151-200': 35, '>200': 166},
            'Maître de Conférences (avec HDR)': {'<50': 17, '50-100': 13, '101-150': 9, '151-200': 14, '>200': 57},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<50': 11, '50-100': 17, '101-150': 14, '151-200': 21, '>200': 124}, 'Une femme': {'<50': 7, '50-100': 7, '101-150': 6, '151-200': 8, '>200': 41}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 22, '50-100': 29, '101-150': 20, '151-200': 25, '>200': 117}, 'Une femme': {'<50': 4, '50-100': 6, '101-150': 5, '151-200': 10, '>200': 49}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 11, '50-100': 8, '101-150': 7, '151-200': 7, '>200': 39}, 'Une femme': {'<50': 6, '50-100': 5, '101-150': 2, '151-200': 7, '>200': 18}},
        },
    };


    const data_graph4 = {
        Overall: {
            '<50': 110,
            '50-100': 30,
            '101-150': 29,
            '151-200': 17,
            '>200': 218,
        },
        Sexe: {
            'Un homme': {'<50': 79, '50-100': 20, '101-150': 21, '151-200': 12, '>200': 158},
            'Une femme': {'<50': 31, '50-100': 10, '101-150': 8, '151-200': 5, '>200': 60},
        },
        Statut: {
            'Professeur des Universités': {'<50': 35, '50-100': 15, '101-150': 12, '151-200': 5, '>200': 86},
            'Maître de Conférences (sans HDR)': {'<50': 50, '50-100': 11, '101-150': 10, '151-200': 8, '>200': 89},
            'Maître de Conférences (avec HDR)': {'<50': 18, '50-100': 4, '101-150': 7, '151-200': 3, '>200': 35},
        },
        Sexe_Statut: {
            'Professeur des Universités': {'Un homme': {'<50': 27, '50-100': 10, '101-150': 6, '151-200': 5, '>200': 64}, 'Une femme': {'<50': 8, '50-100': 5, '101-150': 6, '151-200': 0, '>200': 22}},
            'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 36, '50-100': 8, '101-150': 9, '151-200': 4, '>200': 63}, 'Une femme': {'<50': 14, '50-100': 3, '101-150': 1, '151-200': 4, '>200': 26}},
            'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 10, '50-100': 2, '101-150': 6, '151-200': 3, '>200': 24}, 'Une femme': {'<50': 8, '50-100': 2, '101-150': 1, '151-200': 0, '>200': 11}},
        },
    };
    const datas = [data_graph1, data_graph2,data_graph3,data_graph4];

    const getDataFromTitle = (title) => {
        // Use the appropriate data based on the selected graph title
        const index = graphsTitles.indexOf(title);
        return datas[index];
    };

    const getTitleFromIndex = (index) => {
        return graphsTitles[index];
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

export default Enseignement;
