import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const MIN = 1;
const MAX = 5;

function InitPriceSlider({
    setRestaurantList,
    restaurantMasterList,
    getFilteredPriceRating,
    sliderLabel,
}) {
    const [sliderValues, setSliderValues] = useState([MIN, MAX]); // Values for slider

    useEffect(() => {
        setRestaurantList(
            getFilteredPriceRating(restaurantMasterList, sliderValues)
        );
    }, [sliderValues, restaurantMasterList, setRestaurantList]);

    return (
        <div className="w-full bg-slate-300 shadow-lg h-24 flex flex-col items-center pl-2 rounded-lg">
            <h3>{sliderLabel}</h3>
            <small>
                Current range: {sliderValues[0]} - {sliderValues[1]}
            </small>
            <div className="w-90%">
                <ReactSlider
                    className="bg-white w-full h-2 mt-4"
                    thumbClassName="bg-slate-400 w-4 h-8 rounded-md flex justify-center items-center -mt-3"
                    defaultValue={[MIN, MAX]}
                    renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                    )}
                    onChange={(newValues) => setSliderValues(newValues)}
                    value={sliderValues}
                    min={MIN}
                    max={MAX}
                />
            </div>
        </div>
    );
}

export default InitPriceSlider;
