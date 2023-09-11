//parent container for components
import React from "react";
import InitList from "./RestaurantList";
import styles from "./SearchContainer.module.css";

// Export the Components component
export default function SearchContainer() {
    return (
        <>
            <InitList />
        </>
    );
}
