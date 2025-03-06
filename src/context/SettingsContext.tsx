// context/SettingsContext.tsx
"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserSettings } from "@/types/settings";
import { defaultSettings } from "@/utils/defaultSetting";
import { SettingsContextType } from "@/types/settingsContext";

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
