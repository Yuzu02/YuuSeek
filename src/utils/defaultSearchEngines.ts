import { SearchEngine } from "@/types/searchEngine";
import { customEngineIcon, predefinedEngines } from "@/utils/predefinedEngines";
import { JSX } from "react";

// Helper function to get icon by engine name
export const getSearchEngineIcon = (
    engineName: string | undefined,
): JSX.Element => {
    if (!engineName) return customEngineIcon;

    const engine = predefinedEngines.find((e) => e.name === engineName);
    return engine?.icon || customEngineIcon;
};

// Helper function to get engine by URL
export const getEngineByUrl = (url: string): SearchEngine | undefined => {
    return predefinedEngines.find((engine) => engine.url === url);
};

// Helper function to find an engine by ID
export const getEngineById = (id: string): SearchEngine | undefined => {
    return predefinedEngines.find((engine) => engine.id === id);
};

// Helper function to check if URL is a custom engine (not in predefined list)
export const isCustomEngine = (url: string): boolean => {
    return !predefinedEngines.some((engine) => engine.url === url);
};

// Helper function to get the feeling lucky URL for a given engine URL or ID
export const getFeelingLuckyUrl = (engineUrlOrId: string): string => {
    // First, try to find by URL
    const engineByUrl = getEngineByUrl(engineUrlOrId);
    if (engineByUrl?.feelingLuckyUrl) {
        return engineByUrl.feelingLuckyUrl;
    }

    // If not found by URL, try to find by ID
    const engineById = getEngineById(engineUrlOrId);
    if (engineById?.feelingLuckyUrl) {
        return engineById.feelingLuckyUrl;
    }

    // Try to extract domain from URL to match with an engine
    try {
        const urlObj = new URL(engineUrlOrId);
        const domain = urlObj.hostname;

        for (const engine of predefinedEngines) {
            if (engine.url.includes(domain) && engine.feelingLuckyUrl) {
                return engine.feelingLuckyUrl;
            }
        }
    } catch (e) {
        // URL parsing failed, continue to default
        console.error("Failed to parse URL", e);
    }

    // Default to Google's I'm Feeling Lucky if no match is found
    return "https://www.google.com/search?btnI=1&q={{{s}}}";
};
