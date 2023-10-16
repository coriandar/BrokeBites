const place = ["Restaurant", "Cafe"];

export const optPlace = [
    { value: "", text: "All", selected: "selected" },
    ...place.map((place) => ({ value: place, text: place })),
];
