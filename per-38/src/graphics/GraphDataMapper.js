export const GraphDataMapper = {
  cadre: [
    {
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
  administrative: [], // Empty array for now
  enseignement: [
    {
      title: "Appréciation personnelle sur l'enseignement",
      data: [
        { category: "J'aime toujours", percentage: 51.43 },
        {
          category: "J'aime mais un peu moins",
          percentage: 41.61,
        },
        {
          category: "Je veux arrêter",
          percentage: 6.82,
        },
        {
          category: "Je déconseille",
          percentage: 0.14,
        },
      ],
      info: "Les enseignants sont plutôt satisfaits de leur métier.",
    },
  ],
  // Empty array for now
  recherche: [], // Empty array for now
};
