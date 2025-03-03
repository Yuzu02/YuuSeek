import { z } from "zod";

// types/bang.ts
export const BangSchema = z.object({
    c: z.string().describe("Category").optional(),
    d: z.string().describe("Domain"),
    r: z.number().describe("Relevance/Rank"),
    s: z.string().describe("Service name"),
    sc: z.string().describe("Subcategory").optional(),
    t: z.string().describe("Trigger"),
    u: z.string().describe("URL template with {{{s}}} as search placeholder"),
});

// Extend the schema to include additional properties
export const BangExtendedSchema = BangSchema.extend({
    id: z.string().describe("Unique identifier"),
    isCustom: z.boolean().describe("Whether the bang is custom"),
    isFavorite: z.boolean().describe("Whether the bang is favorited"),
});

export type Bang = z.infer<typeof BangSchema>;
export type BangExtended = z.infer<typeof BangExtendedSchema>;
