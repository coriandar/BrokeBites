const cardinal = ["Central", "North", "West", "East", "South"];

export const optCardinal = [
    { value: "", text: "All", selected: "selected" },
    ...cardinal.map((cardinal) => ({ value: cardinal, text: cardinal })),
];
