import { z } from "zod";

// types/history.ts
export const SearchHistoryItemSchema = z.object({
    id: z.string(),
    query: z.string(),
    timestamp: z.number(),
    bangUsed: z.string().optional(),
    url: z.string().optional(),
});

export type SearchHistoryItem = z.infer<typeof SearchHistoryItemSchema>;
