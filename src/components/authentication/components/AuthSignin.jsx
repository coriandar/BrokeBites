"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Icons } from "@/components/ui/icons/icons";
import { AuthSignInGoogle } from "./AuthSignInGoogle";
import { Terms } from "./AuthTerms";
import { login } from "@/database/firebase/firestore/userDB";
import { useToast } from "@/components/ui/shadcn-ui/use-toast";

export default function AuthSignin({ className, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const regexPattern = "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}";
    const regexTitle =
        "*Must contain at least one number & one uppercase & lowercase letter, & 6 or more characters";

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const success = await login(email, password);
        if (success) {
            toast({ description: "Logged in" });
        } else if (!success) {
            toast({
                variant: "destructive",
                description: "Email or password incorrect!",
            });
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login to existing account
                </h1>
                <p className="text-muted-foreground text-sm">
                    Enter your email below to log into your account
                </p>
            </div>

            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
                <AuthSignInGoogle />
                <Terms />
            </div>
        </div>
    );
}
