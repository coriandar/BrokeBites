import React from "react";

function MarkerDetails({ selected }) {
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
            {selected.website ? <p>{selected.website}</p> : <p>No Website</p>}
        </div>
    );
}

export default MarkerDetails;
