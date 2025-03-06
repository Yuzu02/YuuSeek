import { UserSettings } from "@/types/settings";

export const defaultSettings: UserSettings = {
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
