"use client";
import React, { useState, useEffect } from "react";
import { getJoke } from "@/components/__shared__/util/getJoke";
import locationPin from "@/components/ui/icons/locationPin.svg";
import Image from "next/image";
import AuthGallery from "./AuthGallery";

export default function AuthHero() {
    const [joke, setJoke] = useState();

    useEffect(() => {
        setJoke(getJoke());
    }, []);

    return (
        <div className="relative hidden h-full min-w-[500px] max-w-[500px] flex-col p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900">
                <AuthGallery />
            </div>
            <div className="relative z-20 flex items-center text-lg font-medium">
                <Image
                    src={locationPin}
                    width={24}
                    height={24}
                    alt="Authentication"
                    className="mr-2 h-6 w-6"
                />
                BrokeBites
            </div>
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">&ldquo;{joke}&rdquo;</p>
                </blockquote>
            </div>
        </div>
    );
}
