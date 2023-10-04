import React, { useState, useEffect } from "react";
import Image from "next/image";
import placeholder from "../__assets__/placeholderAvatar.png";

export default function Avatar({ maxW, photoURL }) {
    if (!photoURL) photoURL = placeholder;

    return (
        <div className={`${maxW} rounded-lg`}>
            <Image
                className="w-full rounded-lg"
                src={photoURL}
                alt="Avatar"
                width={200}
                height={200}
                priority
            />
        </div>
    );
}
