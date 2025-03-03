// hooks/useSearchHistory.ts
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import type { SearchHistoryItem } from "@/types/history";

const DEFAULT_MAX_HISTORY = 50;

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
        "search-history",
        [],
    );
    const [maxItems, setMaxItems] = useLocalStorage<number>(
        "max-history-items",
        DEFAULT_MAX_HISTORY,
    );

    const addSearchToHistory = useCallback(
        (query: string, bangUsed?: string, url?: string) => {
            const newItem: SearchHistoryItem = {
                id: uuidv4(),
                query,
                timestamp: Date.now(),
                bangUsed,
                url,
            };

            setHistory((prev) => {
                // Add new item at the beginning
                const updated = [newItem, ...prev];

                // Limit history size
                return updated.slice(0, maxItems);
            });

            return newItem;
        },
        [setHistory, maxItems],
    );

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, [setHistory]);

    const removeHistoryItem = useCallback(
        (id: string) => {
            setHistory((prev) => prev.filter((item) => item.id !== id));
        },
        [setHistory],
    );

    const updateMaxItems = useCallback(
        (newMax: number) => {
            setMaxItems(newMax);
            // Trim history if needed
            setHistory((prev) => prev.slice(0, newMax));
        },
        [setMaxItems, setHistory],
    );

    return {
        history,
        addSearchToHistory,
        clearHistory,
        removeHistoryItem,
        maxItems,
        updateMaxItems,
    };
}
