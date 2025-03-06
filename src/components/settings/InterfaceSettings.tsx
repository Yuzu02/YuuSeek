"use client";

import { useSettings } from "@/context/SettingsContext";

export default function InterfaceSettings() {
    const { settings, updateInterfaceSettings } = useSettings();
    const { interfaceSettings } = settings;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Interface Settings</h2>

            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        id="animationsEnabled"
                        type="checkbox"
                        checked={interfaceSettings.animationsEnabled}
                        onChange={(e) =>
                            updateInterfaceSettings({
                                animationsEnabled: e.target.checked,
                            })
                        }
                        className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="animationsEnabled" className="font-medium">
                        Enable Animations
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        id="showShortcutHints"
                        type="checkbox"
                        checked={interfaceSettings.showShortcutHints}
                        onChange={(e) =>
                            updateInterfaceSettings({
                                showShortcutHints: e.target.checked,
                            })
                        }
                        className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="showShortcutHints" className="font-medium">
                        Show Keyboard Shortcut Hints
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        id="compactMode"
                        type="checkbox"
                        checked={interfaceSettings.compactMode}
                        onChange={(e) =>
                            updateInterfaceSettings({
                                compactMode: e.target.checked,
                            })
                        }
                        className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="compactMode" className="font-medium">
                        Compact Mode
                    </label>
                </div>

                <div>
                    <label
                        htmlFor="fontScale"
                        className="block mb-2 font-medium"
                    >
                        Font Scale: {interfaceSettings.fontScale.toFixed(1)}
                    </label>
                    <input
                        id="fontScale"
                        type="range"
                        min="0.8"
                        max="1.4"
                        step="0.1"
                        value={interfaceSettings.fontScale}
                        onChange={(e) =>
                            updateInterfaceSettings({
                                fontScale: parseFloat(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
