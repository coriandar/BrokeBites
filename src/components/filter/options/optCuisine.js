const cuisineNames = [
    "Chinese",
    "Indian",
    "Japanese",
    "Korean",
    "Taiwanese",
    "Western",
];

export const optCuisine = [
    { value: "", text: "All", selected: "selected" },
    ...cuisineNames.map((cuisine) => ({ value: cuisine, text: cuisine })),
];
