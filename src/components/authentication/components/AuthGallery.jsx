import React from "react";
import Image from "next/image";
import image01 from "../assets/01.jpg";
import image02 from "../assets/02.jpg";
import image03 from "../assets/03.jpg";
import image04 from "../assets/04.jpg";
import image05 from "../assets/05.jpg";
import { setConfig } from "next/config";

export default function AuthGallery() {
    const gallery = [image01, image02, image03, image04, image05];
    const randomIndex = Math.floor(Math.random() * gallery.length);
    const [image, setImage] = React.useState();

    React.useEffect(() => {
        setImage(gallery[randomIndex]);
    }, [image]);

    return (
        <Image
            src={image}
            alt="Food"
            layout="fill"
            className="object-cover opacity-50"
        />
    );
}
