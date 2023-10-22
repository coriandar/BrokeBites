import React from "react";
import { useToast } from "../ui/shadcn-ui/use-toast";
import { Button } from "../ui/shadcn-ui/button";
import { FlagOff } from "lucide-react";
import { reportUnflag } from "./components/reportLogic";

export default function UnflagButton({ review }) {
    const { toast } = useToast();

    return (
        <Button
            onClick={() => reportUnflag({ review, toast })}
            variant={"outline"}
            size={"icon"}
            className="ml-2"
            title={"Unflag"}
        >
            <FlagOff className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
}
