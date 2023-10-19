import Modal from "../../../__shared__/layout/Modal";
import React, { useState, useRef } from "react";
import { auth } from "../../../../database/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { submitBug } from "@/database/firebase/firestore/reportDB";
import Loading from "../../../__shared__/layout/Loading";
import { Button } from "@/components/ui/shadcn-ui/button";

export default function SubmitBug() {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const reportInputRef = useRef(null);

    const handleSubmit = async (report) => {
        setLoading(true);
        await submitBug(report, user);
        setLoading(false);
        alert("Bug report submitted.");
    };

    return (
        <div className="flex">
            <Button variant={"secondary"} onClick={() => setOpen(true)}>
                Submit bug
            </Button>

            <Modal
                open={open}
                maxW={"w-50%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-slate-300">
                    <h3 className="text-lg font-bold">Submit bug</h3>
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
                                placeholder="Write bug report..."
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
