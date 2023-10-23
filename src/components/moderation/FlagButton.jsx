import React from "react";
import { useToast } from "../ui/shadcn-ui/use-toast";
import { Button } from "../ui/shadcn-ui/button";
import { Flag } from "lucide-react";
import { reportFlag } from "./components/reportLogic";

export default function FlagButton({ review }) {
    const [isReported, setIsReported] = React.useState(false);
    const { toast } = useToast();

    return (
        <div title={isReported ? "Flagged review" : "Flag review"}>
            <Button
                onClick={() => reportFlag({ review, setIsReported, toast })}
                disabled={isReported}
                variant={"outline"}
                size={"icon"}
                className="ml-2"
            >
                <Flag className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        </div>
    );
}
