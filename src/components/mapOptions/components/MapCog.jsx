import React from "react";
import Image from "next/image";
import cog from "../../__assets__/settings-cog.svg";

export const MapCog = ({ showOptions, setShowOptions }) => {
    return (
        <Image
            className="opacity-30 hover:opacity-70"
            src={cog}
            alt="cog"
            width={20}
            height={20}
            priority
            onClick={() => setShowOptions(!showOptions)}
        />
    );
};
