const fillingFactor = ["Dessert", "Light", "Filling"];

export const optFilling = [
    { value: "", text: "All", selected: "selected" },
    ...fillingFactor.map((fillFac) => ({ value: fillFac, text: fillFac })),
];
