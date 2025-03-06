"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";
import { isCustomEngine, getEngineByUrl } from "@/utils/defaultSearchEngines";
import { FaPlus, FaCheck } from "react-icons/fa";
import { customEngineIcon, predefinedEngines } from "@/utils/predefinedEngines";

export default function SearchEngineSettings() {
    const { settings, updateSettings } = useSettings();
    const [customUrl, setCustomUrl] = useState("");
    const [isCustomActive, setIsCustomActive] = useState(false);

    // Check if current engine is custom
    const isCurrentEngineCustom = isCustomEngine(settings.defaultSearchEngine);

    const handlePredefinedEngineSelect = (url: string) => {
        updateSettings({ defaultSearchEngine: url });
        setIsCustomActive(false);
    };

    const handleCustomUrlSave = () => {
        if (customUrl) {
            updateSettings({ defaultSearchEngine: customUrl });
        }
    };

    // Get current engine details
    const currentEngine = getEngineByUrl(settings.defaultSearchEngine);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-2xl space-y-6"
        >
            <motion.h2
                className="text-2xl font-bold text-gray-800 dark:text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Search Engine Settings
            </motion.h2>

            <div className="space-y-6">
                <motion.div
                    className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-200">
                        Select a search engine
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {predefinedEngines.map((engine, index) => (
                            <motion.div
                                key={engine.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() =>
                                    handlePredefinedEngineSelect(engine.url)
                                }
                                className={`flex cursor-pointer items-center rounded-lg p-3 transition-all ${
                                    settings.defaultSearchEngine === engine.url
                                        ? "border border-blue-300 bg-blue-100 dark:border-blue-700 dark:bg-blue-900"
                                        : "border border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                                }`}
                            >
                                <div className="mr-3">{engine.icon}</div>
                                <span className="flex-1">{engine.name}</span>
                                {settings.defaultSearchEngine ===
                                    engine.url && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="rounded-full bg-blue-500 p-1"
                                    >
                                        <FaCheck className="h-3 w-3 text-white" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: predefinedEngines.length * 0.1,
                            }}
                            onClick={() => setIsCustomActive(true)}
                            className={`flex cursor-pointer items-center rounded-lg p-3 transition-all ${
                                isCurrentEngineCustom || isCustomActive
                                    ? "border border-blue-300 bg-blue-100 dark:border-blue-700 dark:bg-blue-900"
                                    : "border border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                            }`}
                        >
                            <div className="mr-3">{customEngineIcon}</div>
                            <span className="flex-1">Custom</span>
                            {isCurrentEngineCustom && !isCustomActive && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="rounded-full bg-blue-500 p-1"
                                >
                                    <FaCheck className="h-3 w-3 text-white" />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isCustomActive && (
                        <motion.div
                            className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-200">
                                Custom search engine
                            </h3>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Use{" "}
                                <span className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">
                                    {"{{{s}}}"}
                                </span>{" "}
                                as a placeholder for the search query
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={customUrl}
                                    onChange={(e) =>
                                        setCustomUrl(e.target.value)
                                    }
                                    placeholder="https://example.com/search?q={{{s}}}"
                                    className="flex-1 rounded-lg border border-gray-300 bg-gray-50 p-3 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCustomUrlSave}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={!customUrl}
                                >
                                    <FaPlus className="h-4 w-4" />
                                    Save
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-200">
                        Current search engine
                    </h3>
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                        <div>
                            {isCurrentEngineCustom
                                ? customEngineIcon
                                : currentEngine?.icon}
                        </div>
                        <code className="block flex-1 font-mono text-sm break-all">
                            {settings.defaultSearchEngine}
                        </code>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
