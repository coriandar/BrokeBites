import React from "react";

const Details = ({ selectedMarker }) => {
    return (
        <div id="SelectedMarkerDetails">
            <h3>{selectedMarker.name}</h3>
            <p>{selectedMarker.website}</p>
        </div>
    );
};

export default Details;
