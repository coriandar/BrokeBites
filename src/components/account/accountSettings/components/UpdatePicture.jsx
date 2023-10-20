import React, { useState, useEffect } from "react";
import { auth } from "../../../../database/firebase/firebaseApp";
import { uploadAvatar } from "@/database/firebase/storage/avatarDB";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../../__shared__/layout/Modal";
import Image from "next/image";
import placeholder from "../../../__assets__/placeholderAvatar.png";
import { Icons } from "@/components/ui/icons/icons";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function UpdatePicture() {
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState(placeholder);

    const handleChange = (e) => {
        if (e.target.files[0]) setPhoto(e.target.files[0]);
    };

    const handleUpload = () => {
        uploadAvatar(photo, user, setLoading, setPhotoURL);
    };

    useEffect(() => {
        // js way of if user && user.photoURL
        if (user?.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    return (
        <div className="flex">
            <Button variant={"secondary"} onClick={() => setOpen(true)}>
                Update picture
            </Button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => {
                    setOpen(false);
                    window.location.reload();
                }}
            >
                <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-slate-300">
                    <h3 className="text-lg font-bold">Update picture</h3>

                    <Image
                        id="photo-preview"
                        className="w-40 rounded-lg"
                        src={photoURL}
                        alt="Avatar"
                        width={200}
                        height={200}
                        priority
                    />
                    <input type="file" onChange={handleChange} />

                    {loading ? (
                        <Icons.spinner className="h-7 w-7 animate-spin" />
                    ) : (
                        <button
                            className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
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
