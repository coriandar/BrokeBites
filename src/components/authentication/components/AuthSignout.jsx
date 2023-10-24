import React from "react";
import { logout } from "@/database/firebase/firestore/userDB";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useToast } from "@/components/ui/shadcn-ui/use-toast";

export const AuthSignout = () => {
    const { toast } = useToast();

    async function signoutHandler() {
        const success = await logout();
        if (success) {
            toast({ description: "Logged out" });
        } else if (!success) {
            toast({
                variant: "destructive",
                description: "Error logging out.",
            });
        }
    }

    return (
        <Button
            variant={"destructive"}
            onClick={signoutHandler}
            className={"rounded-full"}
        >
            Logout
        </Button>
    );
};
