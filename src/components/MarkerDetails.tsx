import React from "react";

interface MarkerDetailsProps {
    selected: any;
}

function MarkerDetails({ selected }: MarkerDetailsProps) {
    if (!selected) {
        return console.log("Error loading restaurant");
    }

    return (
        <div id="SelectedMarkerDetails">
            <h3>{selected.name}</h3>
            <p>{selected.website}</p>
        </div>
    );
}

export default MarkerDetails;
