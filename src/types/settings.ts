import { z } from "zod";
import { BangSchema } from "./bang";
import { SearchHistoryItemSchema } from "./history";

export const UserSettingsSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    customBangs: z.array(BangSchema),
    favorites: z.array(z.string()),
    recentSearches: z.array(SearchHistoryItemSchema),
    maxHistoryItems: z.number(),
    defaultSearchEngine: z.string(),
    interfaceSettings: z.object({
        animationsEnabled: z.boolean(),
        showShortcutHints: z.boolean(),
        compactMode: z.boolean(),
        fontScale: z.number(),
    }),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;
