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
            <h3 className="font-bold">{selected.name}</h3>

            {/* Website:{" "}
            <a
                href={selected.website}
                target="_blank"
                rel="noopener noreferrer"
            >
                Link
            </a> */}
            {selected.website ? (
                <a
                    h
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>Link</p>
                </a>
            ) : (
                <p>No Website</p>
            )}
        </div>
    );
}

export default MarkerDetails;
