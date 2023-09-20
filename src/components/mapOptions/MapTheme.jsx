import React from "react";

export default function MapTheme({ mapTheme, setMapTheme }) {
    const updateTheme = (e) => {
        setMapTheme(e.target.value);
    };

    return (
        <div>
            <div className="w-full bg-slate-300 shadow-lg h-5% flex justify-center items-center pl-2 rounded-lg">
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
        </div>
    );
}
