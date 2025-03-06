"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiSettings } from "react-icons/fi";
import { SettingsDialog } from "./SettingsDialog";

export function SettingsButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                title="Settings"
            >
                <FiSettings className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <SettingsDialog open={open} onOpenChange={setOpen} />
        </>
    );
}
