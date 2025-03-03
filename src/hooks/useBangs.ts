// hooks/useBangs.ts
import { useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { defaultBangs } from "../data/bang";
import type { Bang, BangExtended } from "@/types/bang";

export function useBangs() {
    const [customBangs, setCustomBangs] = useLocalStorage<BangExtended[]>(
        "custom-bangs",
        [],
    );
    const [favorites, setFavorites] = useLocalStorage<string[]>(
        "favorite-bangs",
        [],
    );

    // Combine default bangs with custom bangs and annotate favorites
    const allBangs = useMemo(() => {
        const combined = [
            ...defaultBangs.map((bang: Bang) => ({
                ...bang,
                id: uuidv4(), // Add ID to default bangs
                isCustom: false,
                isFavorite: favorites.includes(bang.t),
            })),
            ...customBangs,
        ];

        // Sort by favorites first, then by relevance
        return combined.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return a.r - b.r;
        });
    }, [customBangs, favorites]);

    const addCustomBang = useCallback(
        (bang: Omit<Bang, "id">) => {
            const newBang: BangExtended = {
                ...bang,
                id: uuidv4(),
                isCustom: true,
                isFavorite: false,
            };
            setCustomBangs((prev) => [...prev, newBang]);
            return newBang;
        },
        [setCustomBangs],
    );

    const updateCustomBang = useCallback(
        (id: string, updates: Partial<Bang>) => {
            setCustomBangs((prev) =>
                prev.map((bang) =>
                    bang.id === id ? { ...bang, ...updates } : bang,
                ),
            );
        },
        [setCustomBangs],
    );

    const deleteCustomBang = useCallback(
        (id: string) => {
            setCustomBangs((prev) => prev.filter((bang) => bang.id !== id));
        },
        [setCustomBangs],
    );

    const toggleFavorite = useCallback(
        (trigger: string) => {
            setFavorites((prev) =>
                prev.includes(trigger)
                    ? prev.filter((t) => t !== trigger)
                    : [...prev, trigger],
            );
        },
        [setFavorites],
    );

    const findBang = useCallback(
        (trigger: string) => {
            return allBangs.find(
                (bang) => bang.t.toLowerCase() === trigger.toLowerCase(),
            );
        },
        [allBangs],
    );

    return {
        allBangs,
        customBangs,
        favorites,
        addCustomBang,
        updateCustomBang,
        deleteCustomBang,
        toggleFavorite,
        findBang,
    };
}
