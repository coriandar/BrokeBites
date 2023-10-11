import Modal from "../../../__shared__/layout/Modal";
import React, { useState, useRef } from "react";
import { auth } from "../../../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { submitFeedback } from "@/database/firebase/firestore/reportDB";
import Loading from "../../../__shared__/layout/Loading";

export default function SubmitFeedback() {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const reportInputRef = useRef(null);

    const handleSubmit = async (report) => {
        setLoading(true);
        await submitFeedback(report, user);
        setLoading(false);
        alert("Feedback submitted.");
    };

    return (
        <div className="flex">
            <button
                className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
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
                <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-slate-300">
                    <h3 className="text-lg font-bold">Submit feedback</h3>
                    {loading ? (
                        <Loading />
                    ) : (
                        <form
                            className="m-4 flex h-full w-full flex-col items-center justify-start pl-20 pr-20"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const reportText = reportInputRef.current.value;
                                if (reportText) handleSubmit(reportText);
                            }}
                        >
                            <textarea
                                className="h-full w-full rounded-lg bg-slate-100 p-2 shadow-lg"
                                ref={reportInputRef}
                                style={{ resize: "none" }}
                                placeholder="Write feedback..."
                            />
                            <button
                                className="m-4 w-40 rounded-md bg-slate-200 px-4 py-1"
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
