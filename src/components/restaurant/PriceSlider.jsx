import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import styles from "./RestaurantList.module.css";

const MIN = 1;
const MAX = 5;

function InitPriceSlider({
    setRestaurantList,
    restaurantMasterList,
    getFilteredPriceRating,
}) {
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
