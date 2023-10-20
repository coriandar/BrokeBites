"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Icons } from "@/components/ui/icons/icons";
import { AuthSignInGoogle } from "./AuthSignInGoogle";
import { Terms } from "./AuthTerms";
import { createAccount } from "@/database/firebase/firestore/userDB";
import { useToast } from "@/components/ui/shadcn-ui/use-toast";

export default function AuthSignup({ className, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const regexPattern = "(?=.*[a-z])(?=.*[A-Z]).{6,}";
    const regexTitle =
        "*Must contain one uppercase & lowercase letter, & 6 or more characters";

    const checkFields = () => {
        if (!username || !email || !password) {
            return false;
        }
        return true;
    };

    async function onSubmit(event) {
        event.preventDefault();

        const checkResult = checkFields();
        if (!checkResult) {
            toast({
                variant: "destructive",
                description: "Fill in missing fields.",
            });
        } else {
            setIsLoading(true);
            const success = await createAccount(username, email, password);
            if (success) {
                toast({ description: "Successfully created account." });
            } else if (!success) {
                toast({
                    variant: "destructive",
                    description:
                        "Error creating account, email already exists.",
                });
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    }

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-muted-foreground text-sm">
                    Enter your email below to create your account
                </p>
            </div>

            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="username"
                                type="text"
                                disabled={isLoading}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="**********"
                                type="password"
                                disabled={isLoading}
                                value={password}
                                pattern={regexPattern}
                                title={regexTitle}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign Up with Email
                        </Button>
                    </div>
                </form>
                <AuthSignInGoogle />
                <Terms />
            </div>
        </div>
    );
}
