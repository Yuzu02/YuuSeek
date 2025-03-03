// components/search/BangShortcuts.tsx
"use client";

import React from "react";
import { useSettings } from "@/context/SettingsContext";
import { useSearch } from "@/context/SearchContext";
import { useBangs } from "@/hooks/useBangs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    FaYoutube,
    FaWikipediaW,
    FaGoogle,
    FaAmazon,
    FaGithub,
} from "react-icons/fa";

const DEFAULT_SHORTCUTS = [
    { name: "YouTube", bang: "!yt", icon: <FaYoutube /> },
    { name: "Wikipedia", bang: "!w", icon: <FaWikipediaW /> },
    { name: "Google", bang: "!g", icon: <FaGoogle /> },
    { name: "Amazon", bang: "!a", icon: <FaAmazon /> },
    { name: "GitHub", bang: "!gh", icon: <FaGithub /> },
];

export function BangShortcuts() {
    const { setQuery } = useSearch();
    const { settings } = useSettings();
    const { favorites, allBangs } = useBangs();

    const animationEnabled = settings.interfaceSettings.animationsEnabled;
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Create shortcuts based on favorites
    const shortcuts = React.useMemo(() => {
        if (favorites.length === 0) {
            return DEFAULT_SHORTCUTS;
        }

        return favorites.slice(0, 5).map((trigger) => {
            const bang = allBangs.find((b) => b.t === trigger);
            return {
                name: bang?.s ?? trigger,
                bang: `!${trigger}`,
                icon: null, // No icons for custom shortcuts
            };
        });
    }, [favorites, allBangs]);

    return (
        <div
            className={cn(
                "flex flex-wrap justify-center gap-2",
                settings.interfaceSettings.compactMode && "gap-1 text-sm",
            )}
        >
            {shortcuts.map((item) => (
                <motion.button
                    key={item.bang}
                    whileHover={animationEnabled ? { scale: 1.05 } : {}}
                    whileTap={animationEnabled ? { scale: 0.95 } : {}}
                    className={cn(
                        "px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-secondary-foreground transition-colors duration-200 flex items-center gap-2",
                        settings.interfaceSettings.compactMode &&
                            "px-2 py-1 text-xs",
                    )}
                    onClick={() => {
                        setQuery(`${item.bang} `);
                        inputRef.current?.focus();
                    }}
                >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.name}
                </motion.button>
            ))}
        </div>
    );
}
