import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { Card } from "@/components/ui/shadcn-ui/card";

export default function FilterSlider({
    sliderLabel,
    setRestaurantList,
    restaurantMasterList,
    filterLogic,
}) {
    const MIN = 1;
    const MAX = 5;
    const [sliderValues, setSliderValues] = useState([MIN, MAX]); // Values for slider

    useEffect(() => {
        setRestaurantList(filterLogic(restaurantMasterList, sliderValues));
    }, [sliderValues, filterLogic, restaurantMasterList, setRestaurantList]);

    return (
        <Card className="flex h-24 w-full flex-col items-center rounded-l pl-2 shadow-lg">
            <h3>{sliderLabel}</h3>
            <small>
                Current range: {sliderValues[0]} - {sliderValues[1]}
            </small>
            <div className="w-90%">
                <ReactSlider
                    className="mt-4 h-2 w-full bg-foreground"
                    thumbClassName="bg-primary text-background w-4 h-8 rounded-md flex justify-center items-center -mt-3"
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
        </Card>
    );
}
