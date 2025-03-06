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
            className="space-y-6 max-w-2xl mx-auto"
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
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="font-medium text-lg mb-4 text-gray-700 dark:text-gray-200">
                        Select a search engine
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                                className={`flex items-center p-3 cursor-pointer rounded-lg transition-all ${
                                    settings.defaultSearchEngine === engine.url
                                        ? "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                                        : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-transparent"
                                }`}
                            >
                                <div className="mr-3">{engine.icon}</div>
                                <span className="flex-1">{engine.name}</span>
                                {settings.defaultSearchEngine ===
                                    engine.url && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="bg-blue-500 rounded-full p-1"
                                    >
                                        <FaCheck className="w-3 h-3 text-white" />
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
                            className={`flex items-center p-3 cursor-pointer rounded-lg transition-all ${
                                isCurrentEngineCustom || isCustomActive
                                    ? "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-transparent"
                            }`}
                        >
                            <div className="mr-3">{customEngineIcon}</div>
                            <span className="flex-1">Custom</span>
                            {isCurrentEngineCustom && !isCustomActive && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-blue-500 rounded-full p-1"
                                >
                                    <FaCheck className="w-3 h-3 text-white" />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isCustomActive && (
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-200">
                                Custom search engine
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Use{" "}
                                <span className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded font-mono">
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
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCustomUrlSave}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!customUrl}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Save
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-200">
                        Current search engine
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
