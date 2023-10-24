import React from "react";
import LoggedInBtnSet from "./components/LoggedInBtnSet";
import MapSelectSet from "./components/MapSelectSet";
import ThemeToggle from "../ui/theme/ThemeToggle";
import Chat from "@/components/chatbot/Chatbot2";

export default function Navbar() {
    return (
        <nav className="fixed right-8 top-8 z-50 flex h-12 items-center justify-between rounded-full border border-input bg-background p-4 text-accent-foreground">
            <MapSelectSet />
            <LoggedInBtnSet />
            <ThemeToggle />
            <Chat />
        </nav>
    );
}
