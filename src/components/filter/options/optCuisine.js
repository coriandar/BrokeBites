export const cuisineNames = [
    "Chinese",
    "Filipino",
    "French",
    "Greek",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Malaysian",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Persian",
    "Taiwanese",
    "Thai",
    "Turkish",
    "Vietnamese",
    "Other",
];

export const optCuisine = [
    { value: "", text: "All", selected: "selected" },
    ...cuisineNames.map((cuisine) => ({ value: cuisine, text: cuisine })),
];
