import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-ui/tabs";
import { useRouter } from "next/router";

export default function MapSelectSet() {
    const router = useRouter();

    const changeMap = (value) => {
        if (value === 0) router.push("/");
        else if (value === 1) router.push("/favouriteBites");
        else if (value === 2) router.push("/toVisitBites");
        else if (value === 3) router.push("/visitedBites");
    };

    return (
        <Tabs defaultValue="all" className="pr-2">
            <TabsList className="rounded-full">
                <TabsTrigger
                    value="all"
                    className="rounded-full"
                    onClick={() => changeMap(0)}
                >
                    All Bites
                </TabsTrigger>
                <TabsTrigger
                    value="favourite"
                    className="rounded-full"
                    onClick={() => changeMap(1)}
                >
                    Favourite Bites
                </TabsTrigger>
                <TabsTrigger
                    value="tovisit"
                    className="rounded-full"
                    onClick={() => changeMap(2)}
                >
                    ToVisit Bites
                </TabsTrigger>
                <TabsTrigger
                    value="visited"
                    className="rounded-full"
                    onClick={() => changeMap(3)}
                >
                    Visited Bites
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
