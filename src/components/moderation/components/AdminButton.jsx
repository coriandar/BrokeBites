import React from "react";
import { useToast } from "../../ui/shadcn-ui/use-toast";
import { Button } from "../../ui/shadcn-ui/button";
import { FlagOff, Trash2 } from "lucide-react";
import { reviewUnflag, reviewDelete } from "./reportLogic";

export default function AdminButton({ review }) {
    const { toast } = useToast();

    return (
        <div className="flex">
            <Button
                onClick={() => reviewUnflag({ review, toast })}
                variant={"outline"}
                size={"icon"}
                className="ml-2"
                title={"Unflag"}
            >
                <FlagOff className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button
                onClick={() => reviewDelete({ review, toast })}
                variant={"outline"}
                size={"icon"}
                className="ml-2"
                title={"Delete"}
            >
                <Trash2 className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        </div>
    );
}
