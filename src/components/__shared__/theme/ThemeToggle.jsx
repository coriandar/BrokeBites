"use client";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { setTheme } = useTheme();
    const [title, setTitle] = useState("Light");

    const handleThemeChange = () => {
        setTheme(title === "Light" ? "dark" : "light");
        setTitle(title === "Dark" ? "Light" : "Dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            title={title}
            onClick={handleThemeChange}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
