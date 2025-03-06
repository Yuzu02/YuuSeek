import { getFeelingLuckyUrl } from "@/utils/defaultSearchEngines";

/**
 * Generates a "Feeling Lucky" URL for the given query based on the specified search engine
 * @param query The search query
 * @param engineUrlOrId The search engine URL or ID
 * @returns A URL for the "Feeling Lucky" search
 */
export function getFeelingLuckyRedirect(
    query: string,
    engineUrlOrId: string = "https://www.google.com/search?q={{{s}}}",
): string {
    const cleanQuery = query.replace(/^!/, "").trim();
    if (!cleanQuery) return ""; // Don't redirect for empty queries

    // Get the appropriate feeling lucky URL for this search engine
    const feelingLuckyUrl = getFeelingLuckyUrl(engineUrlOrId);

    return feelingLuckyUrl.replace("{{{s}}}", encodeURIComponent(cleanQuery));
}

/**
 * Check if a query is a feeling lucky query (starts with ! but not followed by a bang command)
 * @param query The search query
 * @returns Boolean indicating whether this is a feeling lucky query
 */
export function isFeelingLuckyQuery(query: string): boolean {
    // Check if the query is just "!" or starts with "!" but is not a bang command pattern
    const regex = /^!\w+\s/;
    return query === "!" || (query.startsWith("!") && !regex.exec(query));
}
