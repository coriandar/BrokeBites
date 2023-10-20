import React, { useState, useEffect } from "react";
import Modal from "../../../__shared__/layout/Modal";
import { auth } from "../../../../database/firebase/firebaseApp";
import { useUpdateEmail } from "react-firebase-hooks/auth";
import Loading from "../../../__shared__/layout/Loading";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function UpdateEmail() {
    const [open, setOpen] = useState(false);
    const [newEmail, setNewEmail] = useState(null);
    const [confirmEmail, setConfirmEmail] = useState(null);

    const [email, setEmail] = useState("");
    const [updateEmail, updating, error] = useUpdateEmail(auth);

    const checkEmail = () => {
        if (!newEmail || !confirmEmail) {
            alert("Fill in missing fields.");

            return false;
        } else if (newEmail !== confirmEmail) {
            alert("Emails do not match.");
            setNewEmail("");
            setConfirmEmail("");
            return false;
        } else if (newEmail === confirmEmail) {
            setEmail(confirmEmail);
            return true;
        }
    };

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        try {
            if (checkEmail() && email) {
                const success = await updateEmail(email);
                if (!updating && success) {
                    alert("Updated email address.");
                } else if (error) {
                    alert("Unsuccessful. Email already registered.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (!open) {
            setNewEmail("");
            setConfirmEmail("");
        }
    }, [open]);

    return (
        <div className="flex">
            <Button variant={"secondary"} onClick={() => setOpen(true)}>
                Update email
            </Button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="flex h-full w-full flex-col items-center rounded-lg bg-slate-300">
                    <h3 className="text-lg font-bold">Update email</h3>

                    {updating ? (
                        <Loading />
                    ) : (
                        <form
                            onSubmit={handleUpdateEmail}
                            className="flex h-full flex-col items-center
                            justify-start"
                        >
                            <div className="mt-8">
                                <label htmlFor="newEmail">New email:</label>
                                <input
                                    id="newEmail"
                                    name="newEmail"
                                    type="email"
                                    className="m-2"
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="newEmail">Confirm email:</label>
                                <input
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    type="email"
                                    className="m-2"
                                    value={confirmEmail}
                                    onChange={(e) =>
                                        setConfirmEmail(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
                                type="submit"
                            >
                                Update email
                            </button>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
}
