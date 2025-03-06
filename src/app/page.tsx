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
        <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-10 pb-10">
            {/* Theme toggle and Settings in the corner */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <SettingsButton />
                <ThemeModeToggle />
            </div>

            <div className="mx-auto flex w-full max-w-2xl flex-grow flex-col items-center justify-center">
                <motion.div
                    initial={animationEnabled ? { opacity: 0, y: -20 } : false}
                    animate={
                        animationEnabled ? { opacity: 1, y: 0 } : { opacity: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
                        YuuSeek
                    </h1>

                    <SearchProvider>
                        <div className="relative mb-6">
                            <SearchBar />
                            <SearchSuggestions />
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-muted-foreground mb-2 text-sm">
                                Try using bang shortcuts:
                            </p>
                            <BangShortcuts />
                        </div>
                    </SearchProvider>
                </motion.div>
            </div>

            <footer className="text-muted-foreground mt-10 text-center text-sm">
                <p>Client-side bang search engine using DuckDuckGo bang data</p>
            </footer>
        </main>
    );
}
