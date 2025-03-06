import { z } from "zod";
import { UserSettingsSchema } from "@/types/settings";

export const SettingsContextSchema = z.object({
    settings: UserSettingsSchema,
    updateSettings: z
        .function()
        .args(z.object({}).partial().and(UserSettingsSchema.partial()))
        .returns(z.void()),
    updateInterfaceSettings: z
        .function()
        .args(UserSettingsSchema.shape.interfaceSettings.partial())
        .returns(z.void()),
    resetSettings: z.function().args().returns(z.void()),
});

export type SettingsContextType = z.infer<typeof SettingsContextSchema>;
