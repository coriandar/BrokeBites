"use client";
import React from "react";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Icons } from "@/components/ui/icons/icons";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/database/firebase/firebaseApp";

export const AuthSignInGoogle = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                type="button"
                disabled={loading}
                onClick={() => signInWithGoogle()}
            >
                {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}
                Google
            </Button>
        </>
    );
};
