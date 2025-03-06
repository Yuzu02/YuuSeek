"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { ThemeModeToggle } from "@/components/theme/ThemeToggle";
import { SearchProvider } from "@/context/SearchContext";
import { useSettings } from "@/context/SettingsContext";
import { BangShortcuts } from "@/components/search/BangShortcuts";
import { SettingsButton } from "@/components/settings/SettingsButton";

export default function Home() {
    const { settings } = useSettings();
    const animationEnabled = settings?.interfaceSettings?.animationsEnabled;

    return (
        <main className="min-h-screen flex flex-col items-center justify-between p-4 pt-10 pb-10">
            {/* Theme toggle and Settings in the corner */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <SettingsButton />
                <ThemeModeToggle />
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
                <motion.div
                    initial={animationEnabled ? { opacity: 0, y: -20 } : false}
                    animate={
                        animationEnabled ? { opacity: 1, y: 0 } : { opacity: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                        YuuSeek
                    </h1>

                    <SearchProvider>
                        <div className="relative mb-6">
                            <SearchBar />
                            <SearchSuggestions />
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-muted-foreground text-sm mb-2">
                                Try using bang shortcuts:
                            </p>
                            <BangShortcuts />
                        </div>
                    </SearchProvider>
                </motion.div>
            </div>

            <footer className="mt-10 text-muted-foreground text-sm text-center">
                <p>Client-side bang search engine using DuckDuckGo bang data</p>
            </footer>
        </main>
    );
}
