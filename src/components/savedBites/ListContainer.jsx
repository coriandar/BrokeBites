import React, { useState } from "react";
import BookmarkList from "./SavedBitesList";

function ListContainer() {
    const [activeTab, setActiveTab] = useState("Favourite"); // Default to "Favourite"

    return (
        <div>
            <ul>
                <li
                    className={`${
                        activeTab === "Favourite" ? "active" : ""
                    } cursor-pointer`}
                    onClick={() => setActiveTab("Favourite")}
                >
                    Favourite
                </li>
                <li
                    className={`${
                        activeTab === "ToVisit" ? "active" : ""
                    } cursor-pointer`}
                    onClick={() => setActiveTab("ToVisit")}
                >
                    To Visit
                </li>
            </ul>
            {<BookmarkList listType={activeTab} />}
        </div>
    );
}

export default ListContainer;
