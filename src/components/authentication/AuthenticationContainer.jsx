import React from "react";
import AuthHero from "./components/AuthHero";
import AuthSignup from "./components/AuthSignup";
import AuthLogin from "./components/AuthLogin";
import ThemeToggle from "../ui/theme/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthenticationContainer() {
    const [login, setLogin] = React.useState(true);

    return (
        <div>
            <div className="flex items-center justify-end pb-2">
                <Tabs
                    defaultValue="login"
                    className="pr-2"
                    onValueChange={() => setLogin(!login)}
                >
                    <TabsList className="rounded-full">
                        <TabsTrigger value="login" className="rounded-full">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="rounded-full">
                            Signup
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <ThemeToggle />
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-solid shadow-2xl">
                <div className="container relative grid h-[800px] flex-col items-center justify-center lg:max-w-[1200px] lg:grid-cols-2 lg:px-0">
                    <AuthHero />
                    {login ? <AuthLogin /> : <AuthSignup />}
                </div>
            </div>
        </div>
    );
}
