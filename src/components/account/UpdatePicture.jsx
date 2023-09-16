import React, { useState, useEffect } from "react";
import { auth, upload } from "../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../modal/Modal";
import Image from "next/image";
import placeholder from "./placeholderAvatar.png";
import spinner from "./../loading/spinner.gif";

export default function UpdatePicture() {
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState(placeholder);

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function handleUpload() {
        upload(photo, user, setLoading, setPhotoURL);
    }

    useEffect(() => {
        // js way of if user && user.photoURL
        if (user?.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    return (
        <div className="flex">
            <button
                className="bg-slate-200 m-4 px-4 py-1 rounded-md w-40"
                onClick={() => setOpen(true)}
            >
                Update picture
            </button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => {
                    setOpen(false);
                    window.location.reload();
                }}
            >
                <div className="w-full h-full bg-slate-300 rounded-lg flex flex-col justify-between items-center">
                    <h3 className="font-bold text-lg">Update picture</h3>

                    <Image
                        id="photo-preview"
                        className="rounded-lg w-40"
                        src={photoURL}
                        alt="Avatar"
                        width={200}
                        height={200}
                        priority
                    />
                    <input type="file" onChange={handleChange} />

                    {loading ? (
                        <Image
                            src={spinner}
                            alt="Loading..."
                            width={50}
                            height={50}
                            priority
                        />
                    ) : (
                        <button
                            className="bg-slate-200 m-4 px-4 py-1 rounded-md w-40"
                            disabled={loading || !photo}
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
}
