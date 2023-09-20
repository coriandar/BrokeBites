import React from "react";

export default function MapTheme({ mapTheme, setMapTheme }) {
    const updateTheme = (e) => {
        setMapTheme(e.target.value);
    };

    return (
        <div className="flex items-center">
            <label for="cuisine">Theme:</label>
            <select
                id="cuisine"
                name="cusine"
                className="m-4 w-full rounded-sm"
                value={mapTheme}
                onChange={updateTheme}
            >
                <option key="light" value="light">
                    Light
                </option>
                <option key="dark" value="dark">
                    Dark
                </option>
                <option key="retro" value="retro">
                    Retro
                </option>
            </select>
        </div>
    );
}
