// hooks/useCustomTheme.ts
import { useTheme } from "next-themes";

export default function useCustomTheme() {
    //* Hook for getting the current theme
    const { theme } = useTheme() as {
        theme: "light" | "dark" | "system" | undefined;
    };
    return theme;
}
