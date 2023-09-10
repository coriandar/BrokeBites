import React from "react";
import axios from "axios";
import Image from "next/image";

function Loading() {
    return (
        <div className="bg-slate-50 flex flex-col justify-center items-center h-full font-medium text-lg">
            <Image
                className="m-8"
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />
            {/* {this.state.joke}... */}
        </div>
    );
}

export default Loading;
