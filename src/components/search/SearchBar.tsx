// components/search/SearchBar.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { useSearch } from "@/context/SearchContext";
import { useSettings } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar() {
    const {
        query,
        setQuery,
        suggestions,
        activeSuggestion,
        setActiveSuggestion,
        showHint,
        setShowHint,
        performSearch,
        updateSuggestions,
        handleSuggestionClick,
        clear,
    } = useSearch();

    const { settings } = useSettings();
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedQuery = useDebounce(query, 150);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Update suggestions based on debounced query
    useEffect(() => {
        updateSuggestions(debouncedQuery);
    }, [debouncedQuery, updateSuggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Show hint if the user types ! $ or ? followed by at least one character
        setShowHint(/^[!$?]\w+/.test(value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextActive =
                activeSuggestion < suggestions.length - 1
                    ? activeSuggestion + 1
                    : 0;
            setActiveSuggestion(nextActive);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const nextActive =
                activeSuggestion > 0
                    ? activeSuggestion - 1
                    : suggestions.length - 1;
            setActiveSuggestion(nextActive);
        } else if (e.key === "Tab") {
            e.preventDefault();

            if (suggestions[activeSuggestion]) {
                const selectedBang = suggestions[activeSuggestion];
                // Extract any existing search terms after the bang
                const regex = /^[!$?]\w+\s+(.*)$/;
                const match = regex.exec(query);
                const searchTerms = match?.[1] ?? "";
                setQuery(`!${selectedBang.t} ${searchTerms}`);
                updateSuggestions("");
            }
        } else if (e.key === "Enter" && suggestions[activeSuggestion]) {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeSuggestion]);
        }
    };

    const animationEnabled = settings.interfaceSettings.animationsEnabled;

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-muted-foreground" />
                </div>

                <Input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`pl-10 pr-10 py-6 text-lg ${
                        settings.interfaceSettings.compactMode
                            ? "rounded-md"
                            : "rounded-lg"
                    }`}
                    style={{
                        fontSize: `${1 + (settings.interfaceSettings.fontScale - 1) * 0.5}rem`,
                    }}
                    placeholder="Search with bangs (!yt, !g, !w, ...)"
                />

                {query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            clear();
                            if (inputRef.current) inputRef.current.focus();
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <FiX className="h-5 w-5" />
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {showHint && settings.interfaceSettings.showShortcutHints && (
                    <motion.div
                        initial={
                            animationEnabled ? { opacity: 0, y: -10 } : false
                        }
                        animate={
                            animationEnabled
                                ? { opacity: 1, y: 0 }
                                : { opacity: 1 }
                        }
                        exit={
                            animationEnabled
                                ? { opacity: 0, y: -10 }
                                : { opacity: 0 }
                        }
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 -top-8 text-sm text-muted-foreground flex items-center"
                    >
                        <FaRegLightbulb className="mr-1" />
                        Press{" "}
                        <kbd className="mx-1 px-2 py-1 bg-muted rounded">
                            Tab
                        </kbd>{" "}
                        to complete
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
