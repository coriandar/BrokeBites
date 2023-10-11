import React, { useState, useEffect } from "react";
import Modal from "../../../__shared__/layout/Modal";
import { auth } from "../../../../database/firebase/firebaseApp";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import Loading from "../../../__shared__/layout/Loading";

export default function UpdatePassword() {
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [password, setPassword] = useState("");
    const [updatePassword, updating, error] = useUpdatePassword(auth);

    // Must contain at least one number & one uppercase & lowercase letter,
    // and 6 or more characters
    const regexPattern = "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}";
    const regexTitle =
        "*Must contain at least one number & one uppercase & lowercase letter, & 6 or more characters";

    const checkPassword = () => {
        if (!newPassword || !confirmPassword) {
            alert("Fill in missing fields.");
            return false;
        } else if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            setNewPassword("");
            setConfirmPassword("");
            return false;
        } else if (newPassword === confirmPassword) {
            setPassword(confirmPassword);
            return true;
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            if (checkPassword() && password) {
                const success = await updatePassword(password);
                if (!updating && success) {
                    alert("Updated password.");
                } else if (error) {
                    alert("Unsuccessful.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (!open) {
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [open]);

    return (
        <div className="flex">
            <button
                className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
                onClick={() => setOpen(true)}
            >
                Update password
            </button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="flex h-full w-full flex-col items-center rounded-lg bg-slate-300">
                    <h3 className="text-lg font-bold">Update password</h3>

                    {updating ? (
                        <Loading />
                    ) : (
                        <form
                            onSubmit={handleUpdatePassword}
                            className="flex h-full flex-col items-center
                            justify-start"
                        >
                            <div className="mt-8">
                                <label htmlFor="newPassword">
                                    New password:
                                </label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    className="m-2"
                                    value={newPassword}
                                    pattern={regexPattern}
                                    title={regexTitle}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="confirmPassword">
                                    Confirm password:
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="m-2"
                                    value={confirmPassword}
                                    pattern={regexPattern}
                                    title={regexTitle}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="text-xs"></div>
                            <button
                                className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
                                type="submit"
                            >
                                Update password
                            </button>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
}
