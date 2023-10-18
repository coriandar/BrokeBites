import React from "react";
import AuthForm from "./AuthForm";
import { Terms } from "./AuthTerms";

export default function AuthLogin() {
    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login to existing account
                </h1>
                <p className="text-muted-foreground text-sm">
                    Enter your email below to login to your account
                </p>
            </div>

            <AuthForm buttonLabel={"Sign In with Email"} />
            <Terms />
        </div>
    );
}
