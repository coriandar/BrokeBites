import React from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/__shared__/theme/ThemeToggle";

export default function Login() {
    return (
        <div>
            <Button>Hello</Button>
            <Button variant="secondary">Hello</Button>
            <ThemeToggle />
        </div>
    );
}
