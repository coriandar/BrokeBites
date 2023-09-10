import React from "react";
import Image from "next/image";
import loader from "./spinner.gif";

const Loading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            {/* <p>Loading...</p> */}
            <Image src={loader} alt="Loading..." />
        </div>
    );
};

export default Loading;
