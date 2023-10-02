const dietary = [
    "Dairy-free",
    "Gluten-free",
    "Halal",
    "Low-carb",
    "Vegan",
    "Vegetarian",
];

export const optDietary = [
    { value: "", text: "None", selected: "selected" },
    ...dietary.map((fillFac) => ({ value: fillFac, text: fillFac })),
];
