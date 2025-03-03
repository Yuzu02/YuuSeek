// context/SettingsContext.tsx
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserSettings } from "@/types/settings";

const defaultSettings: UserSettings = {
    theme: "system",
    customBangs: [],
    favorites: [],
    recentSearches: [],
    maxHistoryItems: 50,
    defaultSearchEngine: "https://www.google.com/search?q={{{s}}}",
    interfaceSettings: {
        animationsEnabled: true,
        showShortcutHints: true,
        compactMode: false,
        fontScale: 1,
    },
};

type SettingsContextType = {
    settings: UserSettings;
    updateSettings: (updates: Partial<UserSettings>) => void;
    updateInterfaceSettings: (
        updates: Partial<UserSettings["interfaceSettings"]>,
    ) => void;
    resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
    undefined,
);

export function SettingsProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [settings, setSettings] = useLocalStorage<UserSettings>(
        "user-settings",
        defaultSettings,
    );

    const updateSettings = useCallback(
        (updates: Partial<UserSettings>) => {
            setSettings((current) => ({ ...current, ...updates }));
        },
        [setSettings],
    );

    const updateInterfaceSettings = useCallback(
        (updates: Partial<UserSettings["interfaceSettings"]>) => {
            setSettings((current) => ({
                ...current,
                interfaceSettings: { ...current.interfaceSettings, ...updates },
            }));
        },
        [setSettings],
    );

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
    }, [setSettings]);

    // Apply theme from settings
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (settings.theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(settings.theme);
        }
    }, [settings.theme]);

    // Memoize the context value
    const contextValue = useMemo(
        () => ({
            settings,
            updateSettings,
            updateInterfaceSettings,
            resetSettings,
        }),
        [settings, updateSettings, updateInterfaceSettings, resetSettings],
    );

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
