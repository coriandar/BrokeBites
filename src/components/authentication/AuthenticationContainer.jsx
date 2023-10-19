import React from "react";
import AuthHero from "./components/AuthHero";
import AuthSignin from "./components/AuthSignin";
import ThemeToggle from "../ui/theme/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "../ui/shadcn-ui/tabs";

export default function AuthenticationContainer() {
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <div className="flex items-center justify-end pb-2">
                <Tabs defaultValue="login" className="pr-2">
                    <TabsList className="rounded-full">
                        <TabsTrigger
                            value="login"
                            className="rounded-full"
                            onClick={() => setValue(0)}
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className="rounded-full"
                            onClick={() => setValue(1)}
                        >
                            Signup
                        </TabsTrigger>
                        <TabsTrigger
                            value="about"
                            className="rounded-full"
                            onClick={() => setValue(2)}
                        >
                            About
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <ThemeToggle />
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-solid shadow-2xl">
                <div className="container relative grid h-[800px] flex-col items-center justify-center lg:max-w-[1200px] lg:grid-cols-2 lg:px-0">
                    <AuthHero />
                    {value === 0 ? (
                        <AuthSignin />
                    ) : value === 1 ? (
                        <></>
                    ) : (
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Why?
                                </h1>
                                <p>
                                    We understand that cooking your own meals
                                    might not always be feasible due to time
                                    constraints or lack of cooking facilities.
                                    That's why we've curated a selection of
                                    smart and pocket-friendly takeaway options
                                    from various restaurants that cater to
                                    students on a budget. Now you can enjoy a
                                    diverse range of flavors without the hassle
                                    of cooking!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
