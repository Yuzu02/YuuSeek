import { JSX, ReactElement } from "react";
import { z } from "zod";

export const SearchEngineSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    icon: z.custom<JSX.Element>(),
});

export type SearchEngine = {
    id: string;
    name: string;
    url: string;
    icon: ReactElement;
    feelingLuckyUrl?: string; // Optional URL format for "I'm Feeling Lucky" searches
};
