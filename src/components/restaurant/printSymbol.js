const printPrice = (priceRating) => {
    let price = "";
    for (let i = 0; i < priceRating; i++) {
        price += "$";
    }
    return price;
};

const printStar = (starRating) => {
    let star = "";
    const blank = 5 - starRating;
    for (let i = 0; i < starRating; i++) star += "★";
    for (let i = 0; i < blank; i++) star += "☆";
    return star;
};

export const showSymbol = ({ restaurant, activeFilter }) => {
    if (activeFilter.includes("filling")) {
        return restaurant.fillingFactor;
    } else if (activeFilter.includes("star")) {
        return printStar(restaurant.starRating);
    } else if (activeFilter.includes("cuisine")) {
        return restaurant?.cuisine;
    } else if (activeFilter.includes("dietary")) {
        return restaurant?.dietary;
    } else {
        return printPrice(restaurant.priceRating);
    }
};
