"use client";

import { useSettings } from "@/context/SettingsContext";

export default function GeneralSettings() {
    const { settings, updateSettings } = useSettings();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">General Settings</h2>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="maxHistoryItems"
                        className="block mb-2 font-medium"
                    >
                        Maximum History Items
                    </label>
                    <input
                        id="maxHistoryItems"
                        type="number"
                        min="0"
                        max="200"
                        value={settings.maxHistoryItems}
                        onChange={(e) =>
                            updateSettings({
                                maxHistoryItems: parseInt(e.target.value) || 0,
                            })
                        }
                        className="w-full p-2 border rounded bg-white dark:bg-gray-800"
                    />
                </div>
            </div>
        </div>
    );
}
