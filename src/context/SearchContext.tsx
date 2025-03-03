// context/SearchContext.tsx
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} from "react";
import { useBangs } from "@/hooks/useBangs";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import type { BangExtended } from "@/types/bang";
import { useSettings } from "./SettingsContext";

type SearchContextType = {
    query: string;
    setQuery: (query: string) => void;
    suggestions: BangExtended[];
    setSuggestions: (suggestions: BangExtended[]) => void;
    activeSuggestion: number;
    setActiveSuggestion: (index: number) => void;
    showHint: boolean;
    setShowHint: (show: boolean) => void;
    performSearch: (query: string) => void;
    updateSuggestions: (input: string) => void;
    handleSuggestionClick: (bang: BangExtended) => void;
    clear: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<BangExtended[]>([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const { allBangs, findBang } = useBangs();
    const { addSearchToHistory } = useSearchHistory();
    const { settings } = useSettings();

    const processQuery = useCallback(
        (input: string) => {
            // Check if the query contains a bang prefix (!, $, or ?)
            const bangRegex = /^([!$?])(\w+)(?:\s+(.*))?$/;
            const bangMatch = bangRegex.exec(input);

            if (bangMatch) {
                const [, , bangTrigger, searchTerms = ""] = bangMatch;

                // Find the matching bang
                const matchedBang = findBang(bangTrigger);

                if (matchedBang) {
                    const url = matchedBang.u.replace(
                        "{{{s}}}",
                        encodeURIComponent(searchTerms.trim()),
                    );

                    // Add to search history
                    addSearchToHistory(input, matchedBang.t, url);

                    // Navigate to URL
                    window.location.href = url;
                    return true;
                }
            }

            return false;
        },
        [findBang, addSearchToHistory],
    );

    const performSearch = useCallback(
        (input: string) => {
            if (!input.trim()) return;

            // Try to process as a bang query
            const processed = processQuery(input);

            // If not a bang query, fallback to default search engine
            if (!processed) {
                const url = settings.defaultSearchEngine.replace(
                    "{{{s}}}",
                    encodeURIComponent(input),
                );

                // Add to search history
                addSearchToHistory(input);

                // Navigate to URL
                window.location.href = url;
            }
        },
        [processQuery, settings.defaultSearchEngine, addSearchToHistory],
    );

    const updateSuggestions = useCallback(
        (input: string) => {
            if (!input.trim()) {
                setSuggestions([]);
                return;
            }

            // Check if the query starts with a bang prefix
            const bangPrefixRegex = /^([!$?])(\w*)/;
            const bangPrefixMatch = bangPrefixRegex.exec(input);

            if (bangPrefixMatch) {
                const [, , bangTrigger] = bangPrefixMatch;

                if (bangTrigger) {
                    // Filter bangs that match the trigger
                    const matchedBangs = allBangs
                        .filter((bang) =>
                            bang.t
                                .toLowerCase()
                                .includes(bangTrigger.toLowerCase()),
                        )
                        .sort((a, b) => {
                            // Favorites come first
                            if (a.isFavorite && !b.isFavorite) return -1;
                            if (!a.isFavorite && b.isFavorite) return 1;

                            // Exact matches come next
                            if (a.t.toLowerCase() === bangTrigger.toLowerCase())
                                return -1;
                            if (b.t.toLowerCase() === bangTrigger.toLowerCase())
                                return 1;

                            // Then sort by relevance
                            return a.r - b.r;
                        })
                        .slice(0, 5); // Limit to 5 suggestions

                    setSuggestions(matchedBangs);
                    setActiveSuggestion(0);
                    return;
                }
            }

            setSuggestions([]);
        },
        [allBangs],
    );

    const handleSuggestionClick = useCallback(
        (bang: BangExtended) => {
            // Extract any existing search terms after the bang
            const searchTermsRegex = /^[!$?]\w+\s+(.*)$/;
            const searchTermsMatch = searchTermsRegex.exec(query);
            const searchTerms = searchTermsMatch?.[1] ?? "";

            if (searchTerms) {
                const url = bang.u.replace(
                    "{{{s}}}",
                    encodeURIComponent(searchTerms.trim()),
                );

                // Add to search history
                addSearchToHistory(`!${bang.t} ${searchTerms}`, bang.t, url);

                // Navigate to URL
                window.location.href = url;
            } else {
                setQuery(`!${bang.t} `);
                setSuggestions([]);
            }
        },
        [query, addSearchToHistory],
    );

    const clear = useCallback(() => {
        setQuery("");
        setSuggestions([]);
        setShowHint(false);
    }, []);

    const contextValue = useMemo(
        () => ({
            query,
            setQuery,
            suggestions,
            setSuggestions,
            activeSuggestion,
            setActiveSuggestion,
            showHint,
            setShowHint,
            performSearch,
            updateSuggestions,
            handleSuggestionClick,
            clear,
        }),
        [
            query,
            suggestions,
            activeSuggestion,
            showHint,
            performSearch,
            updateSuggestions,
            handleSuggestionClick,
            clear,
        ],
    );

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
