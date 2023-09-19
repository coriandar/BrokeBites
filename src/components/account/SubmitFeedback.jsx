import Modal from "../modal/Modal";
import React, { useState, useRef } from "react";
import { db } from "@/components/firebase/FirebaseApp";
import { auth } from "../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Loading from "../loading/Loading";

export default function SubmitFeedback() {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const reportInputRef = useRef(null);

    const handleSubmit = async (report) => {
        setLoading(true);
        const collectionName = "feedbackDB";
        await addDoc(collection(db, collectionName), {
            displayName: user.displayName,
            email: user.email,
            uuid: user.uid,
            bug: report,
        });
        setLoading(false);
        alert("Feedback submitted.");
    };

    return (
        <div className="flex">
            <button
                className="bg-slate-200 m-4 px-4 py-1 rounded-md w-40"
                onClick={() => setOpen(true)}
            >
                Submit feedback
            </button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="w-full h-full bg-slate-300 rounded-lg flex flex-col justify-between items-center">
                    <h3 className="font-bold text-lg">Submit feedback</h3>
                    {loading ? (
                        <Loading />
                    ) : (
                        <form
                            className="flex h-full w-full flex-col justify-start items-center m-4 pl-20 pr-20"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const reportText = reportInputRef.current.value;
                                if (reportText) handleSubmit(reportText);
                            }}
                        >
                            <textarea
                                className="w-full h-full rounded-lg p-2 shadow-lg bg-slate-100"
                                ref={reportInputRef}
                                style={{ resize: "none" }}
                                placeholder="Write feedback..."
                            />
                            <button
                                className="bg-slate-200 m-4 px-4 py-1 rounded-md w-40"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
}
