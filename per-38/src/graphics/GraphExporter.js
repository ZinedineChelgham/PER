export const GraphDataMapper = {
  cadre: [
    {
      data: [
        { category: "Pas du tout", percentage: 5.59 },
        { category: "Plutôt pas", percentage: 7.49 },
        { category: "Moyennement", percentage: 18.12 },
        { category: "Un peu", percentage: 35.01 },
        { category: "Tout à fait", percentage: 33.24 },
      ],
      title: "Métier toujours intéressant?",
    },
    {
      data: [
        { category: "Pas du tout", percentage: 37.64 },
        { category: "Plutôt pas", percentage: 34.07 },
        { category: "Moyennement", percentage: 19.78 },
        { category: "Un peu", percentage: 5.22 },
        { category: "Tout à fait", percentage: 3.3 },
      ],
      title: "Métier toujours attirant?",
    },
  ],
  administrative: [], // Empty array for now
  enseignement: [
    {
      title: "Appréciation personnelle sur l'enseignement",
      data: [
        { category: "J'aime toujours enseigner", percentage: 51.43 },
        {
          category:
            "J'aime toujours enseigner mais un demi service me suffirait",
          percentage: 41.61,
        },
        {
          category: "S'il y a un moyen de ne plus en enseigner, ça m'intéresse",
          percentage: 6.82,
        },
        {
          category: "Je déconseille à quiconque de devenir enseignant",
          percentage: 0.14,
        },
      ],
    },
  ],
  // Empty array for now
  recherche: [], // Empty array for now
};
