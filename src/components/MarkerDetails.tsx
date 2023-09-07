import React from "react";

interface MarkerDetailsProps {
    selected: any;
}

function MarkerDetails({ selected }: MarkerDetailsProps) {
    if (!selected) {
        return (
            <div id="SelectedMarkerDetails">
                <h3>Nothing selected</h3>
            </div>
        );
    }

    return (
        <div id="SelectedMarkerDetails">
            <h3>{selected.name}</h3>
            {selected.website === "NULL" ? (
                <p>{selected.website}</p>
            ) : (
                <p>No Website</p>
            )}
        </div>
    );
}

export default MarkerDetails;
