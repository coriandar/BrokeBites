import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../firebase/FirebaseApp";
import Slider from "react-slider";
import styles from "./RestaurantList.module.css";

const MIN = 1;
const MAX = 5;

//get price rating results
const getFilteredPriceRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.priceRating >= values[0] &&
            restaurant.priceRating <= values[1]
    );
};

function InitPriceSlider({ setRestaurantList, restaurantMasterList }) {
    const [sliderValues, setSliderValues] = useState([MIN, MAX]); // Values for slider

    useEffect(() => {
        setRestaurantList(
            getFilteredPriceRating(restaurantMasterList, sliderValues)
        );
    }, [sliderValues, restaurantMasterList, setRestaurantList]);

    //return restaurant list
    console.log(sliderValues);
    return (
        <div>
            <h3>Price Rating</h3>
            <div>1 - 5</div>
            <small>
                Current range: {sliderValues[0]} - {sliderValues[1]}
            </small>

            <Slider
                className={styles["price-slider"]}
                onChange={(newValues) => setSliderValues(newValues)}
                value={sliderValues}
                min={MIN}
                max={MAX}
            />
        </div>
    );
}

export default InitPriceSlider;
