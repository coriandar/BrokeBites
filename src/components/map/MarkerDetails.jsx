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
        <div>
            <h3>{selected.name}</h3>
            <h3>Filling Factor: {selected.fillingFactor}</h3>
            <h3>Price rating: {selected.priceRating}</h3>
            {selected.website ? ( // Check if website is not an empty string
                <p>
                    Website:{" "}
                    <a
                        href={selected.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {selected.website}
                    </a>
                </p>
            ) : (
                "No website for this restaurant"
            )}
        </div>
    );
}

export default MarkerDetails;
