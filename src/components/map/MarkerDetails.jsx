import React from "react";

function MarkerDetails({ selected }) {
    function handleMenuOpen() {
        console.log("Open");
    }

    if (!selected) {
        return (
            <div id="SelectedMarkerDetails">
                <h3>Nothing selected</h3>
            </div>
        );
    }

    return (
        <div id="SelectedMarkerDetails">
            <h3 className="font-bold">{selected.name}</h3>

            <button className="font-light text-sm" onClick={handleMenuOpen}>
                Menu
            </button>

            <h3>Filling Factor: {selected.fillingFactor}</h3>
            <h3>Price rating: {selected.priceRating}</h3>

            <h3>
                Phone: {selected.contactNumber ? selected.contactNumber : "n/a"}
            </h3>

            <h3>
                Website:{" "}
                {selected.website ? (
                    <a
                        href={selected.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Link
                    </a>
                ) : (
                    "n/a"
                )}
            </h3>
        </div>
    );
}

export default MarkerDetails;
