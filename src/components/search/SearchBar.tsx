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
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiSearch className="text-muted-foreground h-5 w-5" />
                </div>

                <Input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`py-6 pr-10 pl-10 text-lg ${
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
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
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
                        className="text-muted-foreground absolute -top-8 right-3 flex items-center text-sm"
                    >
                        <FaRegLightbulb className="mr-1" />
                        Press{" "}
                        <kbd className="bg-muted mx-1 rounded px-2 py-1">
                            Tab
                        </kbd>{" "}
                        to complete
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
