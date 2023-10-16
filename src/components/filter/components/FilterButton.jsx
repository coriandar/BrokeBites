import React from "react";
import Image from "next/image";
import filter from "../../__assets__/filter.png";

export const FilterButton = ({ showOptions, setShowOptions }) => {
    return (
        <Image
            className="opacity-30 hover:opacity-70"
            src={filter}
            alt="cog"
            width={20}
            height={20}
            priority
            onClick={() => setShowOptions(!showOptions)}
        />
    );
};
