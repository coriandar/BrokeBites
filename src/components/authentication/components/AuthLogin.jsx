import React from "react";
import AuthForm from "./AuthForm";

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

            <p
                id="termsPrivacy"
                className="text-muted-foreground px-8 text-center text-sm"
            >
                <span>By clicking continue, you agree to our </span>
                <span className="hover:text-primary cursor-pointer underline underline-offset-4">
                    Terms of Service
                </span>
                <span> and </span>
                <span className="hover:text-primary cursor-pointer underline underline-offset-4">
                    Privacy Policy.
                </span>
            </p>
        </div>
    );
}
