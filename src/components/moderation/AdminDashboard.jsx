import React from "react";
import { fetchFlaggedReviews } from "@/database/firebase/firestore/reviewDB";
import { fetchReports } from "@/database/firebase/firestore/reportDB";
import ReviewCardRestaurant from "../review/ReviewCardRestaurant";
import ReviewContainer from "../review/ReviewContainer";
import { useRouter } from "next/router";
import { checkAdmin } from "@/database/firebase/firestore/userDB";
import ReportCard from "./components/ReportCard";

export default function AdminDashboard() {
    (async () => {
        try {
            const isAdmin = await checkAdmin();
            if (!isAdmin) router.replace("/");
        } catch (error) {
            console.error("Error checking admin status:", error);
        }
    })();

    const router = useRouter();
    const [flaggedReviews, setFlaggedReviews] = React.useState([]);
    const [reports, setReports] = React.useState([]);
    const [bugReport, setBugReport] = React.useState([]);
    const [feedbackReport, setFeedbackReport] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const reviewCollection = await fetchFlaggedReviews();
            setFlaggedReviews(reviewCollection);
            console.log("Fetching review from admin dash");
            const reportCollection = await fetchReports();
            setReports(reportCollection);
            console.log("Fetching report from admin dash");

            const bug = reports.filter((doc) => doc.type[0] === "b");
            setBugReport(bug);

            const feedback = reports.filter((doc) => doc.type[0] === "f");
            setFeedbackReport(feedback);
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        if (reports.length > 0) {
            setBugReport(reports.filter((doc) => doc.type[0] === "b"));
            setFeedbackReport(reports.filter((doc) => doc.type[0] === "f"));
        }
    }, [reports]);

    return (
        <div className="m-12 flex h-[700px] w-screen items-center justify-between">
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Flagged Reviews</h3>
                <ReviewContainer
                    reviewsData={flaggedReviews}
                    reviewCardType={ReviewCardRestaurant}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Bug Reports</h3>
                <ReviewContainer
                    reviewsData={bugReport}
                    reviewCardType={ReportCard}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Feedback Reports</h3>
                <ReviewContainer
                    reviewsData={feedbackReport}
                    reviewCardType={ReportCard}
                />
            </div>
        </div>
    );
}
