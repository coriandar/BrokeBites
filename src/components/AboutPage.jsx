import React, { useState } from "react";

export default function AboutPage() {
    return (
        <div className="flex h-full p-80">
            <div className="m-4 w-1/3">
                <h1 className="font-bold">
                    BrokeBites: Where delicious meets economical!
                </h1>
                <p>
                    Are you a student on a tight budget, tired of surviving on
                    instant noodles and microwave dinners? Say hello to
                    BrokeBites, your ultimate go-to resource for delicious,
                    pocket-friendly, and convenient takeaway options! We
                    understand the struggles of being a student and how
                    challenging it can be to find affordable yet flavourful
                    meals. That's why we're here to help you eat well without
                    breaking the bank, by exploring budget-friendly food choices
                    from restaurants around you.
                </p>
            </div>
            <div className="m-4 w-1/3">
                <h2 className="font-bold">Our Mission:</h2>
                <p>
                    At BrokeBites, our mission is to empower students with the
                    knowledge and savvy to find budget-friendly takeaway options
                    that don't compromise on taste. We believe that eating on a
                    shoestring budget should never mean sacrificing flavor or
                    convenience.
                </p>
            </div>
            <div className="m-4 w-1/3">
                <h2 className="font-bold">Why?</h2>
                <p>
                    We understand that cooking your own meals might not always
                    be feasible due to time constraints or lack of cooking
                    facilities. That's why we've curated a selection of smart
                    and pocket-friendly takeaway options from various
                    restaurants that cater to students on a budget. Now you can
                    enjoy a diverse range of flavors without the hassle of
                    cooking!
                </p>
            </div>
        </div>
    );
}
