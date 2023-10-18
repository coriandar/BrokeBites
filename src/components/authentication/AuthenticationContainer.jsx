import React from "react";
import AuthHero from "./components/AuthHero";
import AuthSignup from "./components/AuthSignup";
import AuthLogin from "./components/AuthLogin";
import ThemeToggle from "../__shared__/theme/ThemeToggle";

export default function AuthenticationContainer() {
    const [login, setLogin] = React.useState(true);

    return (
        <div className="overflow-hidden rounded-2xl border-2 border-solid shadow-2xl">
            <div className="container relative h-[800px] flex-col items-center justify-center sm:grid lg:max-w-[1200px] lg:grid-cols-2 lg:px-0">
                <AuthHero />
                {login ? <AuthLogin /> : <AuthSignup />}
            </div>
        </div>
    );
}
