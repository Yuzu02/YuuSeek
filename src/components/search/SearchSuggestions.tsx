// components/search/SearchSuggestions.tsx
"use client";

import { useSearch } from "@/context/SearchContext";
import { useSettings } from "@/context/SettingsContext";
import { useBangs } from "@/hooks/useBangs";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";

export function SearchSuggestions() {
    const { suggestions, activeSuggestion, handleSuggestionClick } =
        useSearch();
    const { settings } = useSettings();
    const { toggleFavorite } = useBangs();

    const animationEnabled = settings.interfaceSettings.animationsEnabled;
    const compactMode = settings.interfaceSettings.compactMode;

    if (suggestions.length === 0) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={animationEnabled ? { opacity: 0, y: 10 } : false}
                animate={
                    animationEnabled ? { opacity: 1, y: 0 } : { opacity: 1 }
                }
                exit={animationEnabled ? { opacity: 0, y: 10 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-2 w-full bg-card border rounded-lg shadow-lg overflow-hidden"
            >
                <ul className="py-1">
                    {suggestions.map((bang, index) => (
                        <motion.li
                            key={bang.t}
                            initial={
                                animationEnabled
                                    ? { opacity: 0, x: -10 }
                                    : false
                            }
                            animate={
                                animationEnabled
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 1 }
                            }
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className={`px-4 py-3 hover:bg-accent cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                                index === activeSuggestion ? "bg-accent" : ""
                            } ${compactMode ? "py-2" : "py-3"}`}
                            onClick={() => handleSuggestionClick(bang)}
                        >
                            <div className="flex-1">
                                <div className="font-medium">!{bang.t}</div>
                                <div className="text-sm text-muted-foreground">
                                    {bang.s} - {bang.sc}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {bang.isCustom && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        Custom
                                    </Badge>
                                )}

                                <Badge className="text-xs">{bang.c}</Badge>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(bang.t);
                                    }}
                                    className="p-1 rounded-full hover:bg-muted transition-colors"
                                >
                                    <FaStar
                                        className={`text-sm ${
                                            bang.isFavorite
                                                ? "text-yellow-400"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </AnimatePresence>
    );
}
