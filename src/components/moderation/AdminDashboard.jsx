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

            const reportCollection = await fetchReports();
            setReports(reportCollection);
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
                    emptyText={"No reviews"}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Bug Reports</h3>
                <ReviewContainer
                    reviewsData={bugReport}
                    reviewCardType={ReportCard}
                    emptyText={"No bugs reported"}
                />
            </div>
            <div className="m-4 h-full w-1/3">
                <h3 className="text-lg font-bold">Feedback Reports</h3>
                <ReviewContainer
                    reviewsData={feedbackReport}
                    reviewCardType={ReportCard}
                    emptyText={"No feedback reported"}
                />
            </div>
        </div>
    );
}
