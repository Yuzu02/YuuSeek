"use client";

// Components
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { themeMessages, toastMessages } from "@/utils/data/constants";

// Hooks
import useCustomTheme from "@/hooks/useCustomTheme";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Utils

interface ThemeModeToggleProps {
    className?: string;
    icon?: string;
}

export function ThemeModeToggle({
    className,
    icon,
}: Readonly<ThemeModeToggleProps>) {
    // Setup hooks
    const { setTheme } = useTheme();
    const theme = useCustomTheme();

    // Manejo de cookies para el tema
    function handleThemeCookieChange(newTheme: string): void {
        document.cookie = `NEXT_THEME=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn(className)}>
                    <Sun
                        className={cn(
                            "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
                            icon,
                        )}
                    />
                    <Moon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
                            icon,
                        )}
                    />
                    <span className="sr-only">
                        {themeMessages.toggleThemeText}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuCheckboxItem
                    onClick={() => {
                        setTheme("light");
                        handleThemeCookieChange("light");
                        toast.success(themeMessages.themeChangeToLightMode, {
                            duration: 2500,
                        });
                    }}
                    checked={theme === "light"}
                >
                    {toastMessages.lightThemeText}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    onClick={() => {
                        setTheme("dark");
                        handleThemeCookieChange("light");
                        toast.success(themeMessages.themeChangeToDarkMode, {
                            duration: 2500,
                        });
                    }}
                    checked={theme === "dark"}
                >
                    {toastMessages.darkThemeText}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    onClick={() => {
                        setTheme("system");
                        handleThemeCookieChange("");
                        toast.success(themeMessages.themeChangeToSystemMode, {
                            duration: 2500,
                        });
                    }}
                    checked={theme === "system"}
                >
                    {toastMessages.systemThemeText}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
