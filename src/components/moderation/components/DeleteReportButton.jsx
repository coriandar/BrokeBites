import React from "react";
import { useToast } from "../../ui/shadcn-ui/use-toast";
import { Button } from "../../ui/shadcn-ui/button";
import { Trash2 } from "lucide-react";
import { reportDelete } from "./reportLogic";

export default function DeleteReportButton({ review }) {
    const { toast } = useToast();

    return (
        <div className="flex">
            <Button
                onClick={() => reportDelete({ review, toast })}
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
