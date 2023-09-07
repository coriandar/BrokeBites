import React from "react";

interface MarkerDetailsProps {
    selected: {
        // probably need add more types as we get more info
        // fixes the red dot error
        name: string;
        website: string;
    } | null;
}

function MarkerDetails({ selected }: MarkerDetailsProps) {
    if (!selected) {
        console.log("Error loading restaurant");
        return null;
    }

    return (
        <div id="SelectedMarkerDetails">
            <h3>{selected.name}</h3>
            <p>{selected.website}</p>
        </div>
    );
}

export default MarkerDetails;
