import type { BangExtended } from "@/types/bang";
import { z } from "zod";

const SearchContextSchema = z.object({
    query: z.string(),
    setQuery: z.function().args(z.string()).returns(z.void()),
    suggestions: z.array(z.custom<BangExtended>()),
    setSuggestions: z
        .function()
        .args(z.array(z.custom<BangExtended>()))
        .returns(z.void()),
    activeSuggestion: z.number(),
    setActiveSuggestion: z.function().args(z.number()).returns(z.void()),
    showHint: z.boolean(),
    setShowHint: z.function().args(z.boolean()).returns(z.void()),
    performSearch: z.function().args(z.string()).returns(z.void()),
    updateSuggestions: z.function().args(z.string()).returns(z.void()),
    handleSuggestionClick: z
        .function()
        .args(z.custom<BangExtended>())
        .returns(z.void()),
    clear: z.function().args().returns(z.void()),
});

// Export the schema and inferred type
export { SearchContextSchema };

export type SearchContextType = {
    query: string;
    setQuery: (query: string) => void;
    suggestions: BangExtended[];
    setSuggestions: (suggestions: BangExtended[]) => void;
    activeSuggestion: number;
    setActiveSuggestion: (index: number) => void;
    showHint: boolean;
    setShowHint: (show: boolean) => void;
    performSearch: (query: string) => void;
    updateSuggestions: (query: string) => void;
    handleSuggestionClick: (bang: BangExtended) => void;
    clear: () => void;
};
