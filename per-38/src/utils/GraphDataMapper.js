export const GraphDataMapper = {
  cadre: [
    {
      type: "monocritere",
      data: [
        { category: "Tout à fait", percentage: 5.59 },
        { category: "Un peu", percentage: 7.49 },
        { category: "Moyennement", percentage: 18.12 },
        { category: "Plutôt pas", percentage: 35.01 },
        { category: "Pas du tout", percentage: 33.24 },
      ],
      title: "Métier toujours intéressant?",
      info:
        "Les cadres sont moins satisfaits de leur métier que les autres catégories.",
    },
    {
      type: "monocritere",
      data: [
        { category: "Tout à fait", percentage: 37.64 },
        { category: "Un peu", percentage: 34.07 },
        { category: "Moyennement", percentage: 19.78 },
        { category: "Plutôt pas", percentage: 5.22 },
        { category: "Pas du tout", percentage: 3.3 },
      ],
      title: "Métier toujours attirant?",
      info:
        "Les cadres sont moins satisfaits de leur métier que les autres catégories.",
    },
  ],
  administrative: [
    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Temps passé en moyenne par semaine pour les responsabilités administratives",
      x_axis_Titles: "Temps passé en moyenne par semaine",
      data: {
        Overall: {
          "<5": 226,
          "5-8": 213,
          "9-15": 105,
          ">15": 100,
        },
        Sexe: {
          "Un homme": { "<5": 170, "5-8": 159, "9-15": 68, ">15": 70 },
          "Une femme": { "<5": 56, "5-8": 54, "9-15": 37, ">15": 30 },
        },
        Statut: {
          "Professeur des Universités": {
            "<5": 54,
            "5-8": 92,
            "9-15": 52,
            ">15": 49,
          },
          "Maître de Conférences (sans HDR)": {
            "<5": 124,
            "5-8": 74,
            "9-15": 32,
            ">15": 32,
          },
          "Maître de Conférences (avec HDR)": {
            "<5": 38,
            "5-8": 41,
            "9-15": 18,
            ">15": 14,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": { "<5": 38, "5-8": 70, "9-15": 34, ">15": 38 },
            "Une femme": { "<5": 16, "5-8": 22, "9-15": 18, ">15": 11 },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": { "<5": 96, "5-8": 60, "9-15": 22, ">15": 21 },
            "Une femme": { "<5": 28, "5-8": 14, "9-15": 10, ">15": 11 },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": { "<5": 28, "5-8": 24, "9-15": 11, ">15": 6 },
            "Une femme": { "<5": 10, "5-8": 17, "9-15": 7, ">15": 8 },
          },
        },
      },
    },
    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Temps passé en moyenne par semaine pour les responsabilités pédagogiques",
      x_axis_Titles: "Temps passé en moyenne par semaine",
      data: {
        Overall: {
          "<5": 211,
          "5-8": 263,
          "9-15": 130,
          ">15": 64,
        },
        Sexe: {
          "Un homme": { "<5": 167, "5-8": 186, "9-15": 90, ">15": 36 },
          "Une femme": { "<5": 44, "5-8": 77, "9-15": 40, ">15": 28 },
        },
        Statut: {
          "Professeur des Universités": {
            "<5": 88,
            "5-8": 99,
            "9-15": 44,
            ">15": 12,
          },
          "Maître de Conférences (sans HDR)": {
            "<5": 75,
            "5-8": 118,
            "9-15": 55,
            ">15": 37,
          },
          "Maître de Conférences (avec HDR)": {
            "<5": 33,
            "5-8": 44,
            "9-15": 25,
            ">15": 13,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": { "<5": 70, "5-8": 71, "9-15": 29, ">15": 7 },
            "Une femme": { "<5": 18, "5-8": 28, "9-15": 15, ">15": 5 },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": { "<5": 55, "5-8": 88, "9-15": 44, ">15": 22 },
            "Une femme": { "<5": 20, "5-8": 30, "9-15": 11, ">15": 15 },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": { "<5": 28, "5-8": 26, "9-15": 13, ">15": 6 },
            "Une femme": { "<5": 5, "5-8": 18, "9-15": 12, ">15": 7 },
          },
        },
      },
    },

  ], // Empty array for now
  enseignement: [
    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Nombre d'heures complémentaires en moyenne ces deux dernières années",
      x_axis_Titles: "Nombre d'heures complémentaires",
      data: {
        Overall: {
          "<50": 177,
          "51-80": 131,
          "81-120": 122,
          "121-150": 73,
          "bcp plus !": 67,
        },
        Sexe: {
          "Un homme": {
            "<50": 125,
            "51-80": 97,
            "81-120": 97,
            "121-150": 55,
            "bcp plus !": 48,
          },
          "Une femme": {
            "<50": 52,
            "51-80": 34,
            "81-120": 25,
            "121-150": 18,
            "bcp plus !": 19,
          },
        },
        Statut: {
          "Professeur des Universités": {
            "<50": 74,
            "51-80": 55,
            "81-120": 40,
            "121-150": 20,
            "bcp plus !": 13,
          },
          "Maître de Conférences (sans HDR)": {
            "<50": 69,
            "51-80": 60,
            "81-120": 62,
            "121-150": 43,
            "bcp plus !": 35,
          },
          "Maître de Conférences (avec HDR)": {
            "<50": 33,
            "51-80": 15,
            "81-120": 18,
            "121-150": 8,
            "bcp plus !": 19,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": {
              "<50": 54,
              "51-80": 42,
              "81-120": 34,
              "121-150": 11,
              "bcp plus !": 8,
            },
            "Une femme": {
              "<50": 20,
              "51-80": 13,
              "81-120": 6,
              "121-150": 9,
              "bcp plus !": 5,
            },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": {
              "<50": 52,
              "51-80": 43,
              "81-120": 47,
              "121-150": 35,
              "bcp plus !": 29,
            },
            "Une femme": {
              "<50": 17,
              "51-80": 17,
              "81-120": 15,
              "121-150": 8,
              "bcp plus !": 6,
            },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": {
              "<50": 18,
              "51-80": 11,
              "81-120": 14,
              "121-150": 7,
              "bcp plus !": 11,
            },
            "Une femme": {
              "<50": 15,
              "51-80": 4,
              "81-120": 4,
              "121-150": 1,
              "bcp plus !": 8,
            },
          },
        },
      },
    },




    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Nombre d'heures complémentaires en moyenne ces cinq dernières années",
      x_axis_Titles: "Nombre d'heures complémentaires",
      data: {
        Overall: {
          "<50": 139,
          "51-80": 118,
          "81-120": 151,
          "121-150": 82,
          "bcp plus !": 60,
        },
        Sexe: {
          "Un homme": {
            "<50": 101,
            "51-80": 81,
            "81-120": 122,
            "121-150": 55,
            "bcp plus !": 46,
          },
          "Une femme": {
            "<50": 38,
            "51-80": 37,
            "81-120": 29,
            "121-150": 27,
            "bcp plus !": 14,
          },
        },
        Statut: {
          "Professeur des Universités": {
            "<50": 58,
            "51-80": 54,
            "81-120": 46,
            "121-150": 22,
            "bcp plus !": 12,
          },
          "Maître de Conférences (sans HDR)": {
            "<50": 52,
            "51-80": 54,
            "81-120": 74,
            "121-150": 47,
            "bcp plus !": 34,
          },
          "Maître de Conférences (avec HDR)": {
            "<50": 28,
            "51-80": 10,
            "81-120": 26,
            "121-150": 13,
            "bcp plus !": 14,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": {
              "<50": 41,
              "51-80": 42,
              "81-120": 39,
              "121-150": 9,
              "bcp plus !": 9,
            },
            "Une femme": {
              "<50": 17,
              "51-80": 12,
              "81-120": 7,
              "121-150": 13,
              "bcp plus !": 3,
            },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": {
              "<50": 44,
              "51-80": 33,
              "81-120": 57,
              "121-150": 37,
              "bcp plus !": 28,
            },
            "Une femme": {
              "<50": 8,
              "51-80": 21,
              "81-120": 17,
              "121-150": 10,
              "bcp plus !": 6,
            },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": {
              "<50": 15,
              "51-80": 6,
              "81-120": 21,
              "121-150": 9,
              "bcp plus !": 9,
            },
            "Une femme": {
              "<50": 13,
              "51-80": 4,
              "81-120": 5,
              "121-150": 4,
              "bcp plus !": 5,
            },
          },
        },
      },
    },





    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Nombre moyen d'étudiants inscrits sur Formation informatique",
      x_axis_Titles: "Nombre d'étudiants",
      data: {
        Overall: {
          "<50": 67,
          "50-100": 73,
          "101-150": 57,
          "151-200": 80,
          ">200": 402,
        },
        Sexe: {
          "Un homme": {
            "<50": 49,
            "50-100": 55,
            "101-150": 44,
            "151-200": 54,
            ">200": 291,
          },
          "Une femme": {
            "<50": 18,
            "50-100": 18,
            "101-150": 13,
            "151-200": 26,
            ">200": 111,
          },
        },
        Statut: {
          "Professeur des Universités": {
            "<50": 18,
            "50-100": 24,
            "101-150": 20,
            "151-200": 29,
            ">200": 165,
          },
          "Maître de Conférences (sans HDR)": {
            "<50": 26,
            "50-100": 35,
            "101-150": 25,
            "151-200": 35,
            ">200": 166,
          },
          "Maître de Conférences (avec HDR)": {
            "<50": 17,
            "50-100": 13,
            "101-150": 9,
            "151-200": 14,
            ">200": 57,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": {
              "<50": 11,
              "50-100": 17,
              "101-150": 14,
              "151-200": 21,
              ">200": 124,
            },
            "Une femme": {
              "<50": 7,
              "50-100": 7,
              "101-150": 6,
              "151-200": 8,
              ">200": 41,
            },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": {
              "<50": 22,
              "50-100": 29,
              "101-150": 20,
              "151-200": 25,
              ">200": 117,
            },
            "Une femme": {
              "<50": 4,
              "50-100": 6,
              "101-150": 5,
              "151-200": 10,
              ">200": 49,
            },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": {
              "<50": 11,
              "50-100": 8,
              "101-150": 7,
              "151-200": 7,
              ">200": 39,
            },
            "Une femme": {
              "<50": 6,
              "50-100": 5,
              "101-150": 2,
              "151-200": 7,
              ">200": 18,
            },
          },
        },
      },
    },





    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
          "Nombre moyen d'étudiants inscrits sur les autres formations",
      x_axis_Titles: "Nombre d'étudiants",
      data: {
        Overall: {
          "<50": 110,
          "50-100": 30,
          "101-150": 29,
          "151-200": 17,
          ">200": 218,
        },
        Sexe: {
          "Un homme": {
            "<50": 79,
            "50-100": 20,
            "101-150": 21,
            "151-200": 12,
            ">200": 158,
          },
          "Une femme": {
            "<50": 31,
            "50-100": 10,
            "101-150": 8,
            "151-200": 5,
            ">200": 60,
          },
        },
        Statut: {
          "Professeur des Universités": {
            "<50": 35,
            "50-100": 15,
            "101-150": 12,
            "151-200": 5,
            ">200": 86,
          },
          "Maître de Conférences (sans HDR)": {
            "<50": 50,
            "50-100": 11,
            "101-150": 10,
            "151-200": 8,
            ">200": 89,
          },
          "Maître de Conférences (avec HDR)": {
            "<50": 18,
            "50-100": 4,
            "101-150": 7,
            "151-200": 3,
            ">200": 35,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": {
              "<50": 27,
              "50-100": 10,
              "101-150": 6,
              "151-200": 5,
              ">200": 64,
            },
            "Une femme": {
              "<50": 8,
              "50-100": 5,
              "101-150": 6,
              "151-200": 0,
              ">200": 22,
            },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": {
              "<50": 36,
              "50-100": 8,
              "101-150": 9,
              "151-200": 4,
              ">200": 63,
            },
            "Une femme": {
              "<50": 14,
              "50-100": 3,
              "101-150": 1,
              "151-200": 4,
              ">200": 26,
            },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": {
              "<50": 10,
              "50-100": 2,
              "101-150": 6,
              "151-200": 3,
              ">200": 24,
            },
            "Une femme": {
              "<50": 8,
              "50-100": 2,
              "101-150": 1,
              "151-200": 0,
              ">200": 11,
            },
          },
        },
      },
    },
  ],
  // Empty array for now
  recherche: [
    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title:
        "Quantité de doctorants/stagiaires/... ces 5 dernières années contribuant à votre recherche",
      x_axis_Titles: "Quantité de doctorants/stagiaires/...",
      data: {
        Overall: {
          "0": 57,
          "1": 126,
          "2": 118,
          "3": 135,
          "4": 183,
          "5": 79,
        },
        Sexe: {
          "Un homme": { "0": 40, "1": 92, "2": 85, "3": 79, "4": 137, "5": 69 },
          "Une femme": { "0": 17, "1": 34, "2": 33, "3": 56, "4": 46, "5": 10 },
        },
        Statut: {
          "Professeur des Universités": {
            "0": 7,
            "1": 35,
            "2": 35,
            "3": 54,
            "4": 89,
            "5": 45,
          },
          "Maître de Conférences (sans HDR)": {
            "0": 40,
            "1": 65,
            "2": 63,
            "3": 53,
            "4": 55,
            "5": 14,
          },
          "Maître de Conférences (avec HDR)": {
            "0": 7,
            "1": 22,
            "2": 15,
            "3": 23,
            "4": 35,
            "5": 17,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": { "0": 6, "1": 24, "2": 28, "3": 30, "4": 66, "5": 40 },
            "Une femme": { "0": 1, "1": 11, "2": 7, "3": 24, "4": 23, "5": 5 },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": {
              "0": 29,
              "1": 53,
              "2": 43,
              "3": 33,
              "4": 43,
              "5": 12,
            },
            "Une femme": {
              "0": 11,
              "1": 12,
              "2": 20,
              "3": 20,
              "4": 12,
              "5": 2,
            },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": { "0": 3, "1": 12, "2": 10, "3": 12, "4": 24, "5": 14 },
            "Une femme": { "0": 4, "1": 10, "2": 5, "3": 11, "4": 11, "5": 3 },
          },
        },
      },
    },
    {
      type: "multicritere",
      info: "contexte sur le graphique a definir ...",
      title: "Nbe d'heures de recherche disponibles",
      x_axis_Titles: "Nbe d'heures de recherche disponibles",
      data: {
        Overall: {
          "0": 109,
          "1": 236,
          "2": 198,
          "3": 105,
          "4": 46,
          "5": 14,
        },
        Sexe: {
          "Un homme": {
            "0": 75,
            "1": 168,
            "2": 130,
            "3": 80,
            "4": 43,
            "5": 13,
          },
          "Une femme": { "0": 34, "1": 68, "2": 68, "3": 25, "4": 3, "5": 1 },
        },
        Statut: {
          "Professeur des Universités": {
            "0": 33,
            "1": 95,
            "2": 74,
            "3": 42,
            "4": 16,
            "5": 5,
          },
          "Maître de Conférences (sans HDR)": {
            "0": 55,
            "1": 98,
            "2": 83,
            "3": 38,
            "4": 22,
            "5": 5,
          },
          "Maître de Conférences (avec HDR)": {
            "0": 18,
            "1": 40,
            "2": 32,
            "3": 19,
            "4": 6,
            "5": 1,
          },
        },
        Sexe_Statut: {
          "Professeur des Universités": {
            "Un homme": { "0": 24, "1": 72, "2": 50, "3": 26, "4": 16, "5": 5 },
            "Une femme": { "0": 9, "1": 23, "2": 24, "3": 16, "4": 0, "5": 0 },
          },
          "Maître de Conférences (sans HDR)": {
            "Un homme": { "0": 38, "1": 72, "2": 53, "3": 33, "4": 20, "5": 5 },
            "Une femme": { "0": 17, "1": 26, "2": 30, "3": 5, "4": 2, "5": 0 },
          },
          "Maître de Conférences (avec HDR)": {
            "Un homme": { "0": 11, "1": 21, "2": 20, "3": 16, "4": 5, "5": 1 },
            "Une femme": { "0": 7, "1": 19, "2": 12, "3": 3, "4": 1, "5": 0 },
          },
        },
      },
    },
  ],
};
