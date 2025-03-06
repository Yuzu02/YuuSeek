"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiSettings } from "react-icons/fi";
import SearchEngineSettings from "./SearchEngineSettings";
import InterfaceSettings from "./InterfaceSettings";
import GeneralSettings from "./GeneralSettings";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({
    open,
    onOpenChange,
}: Readonly<SettingsDialogProps>) {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FiSettings className="h-5 w-5" />
                        Settings
                    </DialogTitle>
                </DialogHeader>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="mb-6 grid grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="search">Search Engine</TabsTrigger>
                        <TabsTrigger value="interface">Interface</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="mt-0">
                        <GeneralSettings />
                    </TabsContent>

                    <TabsContent value="search" className="mt-0">
                        <SearchEngineSettings />
                    </TabsContent>

                    <TabsContent value="interface" className="mt-0">
                        <InterfaceSettings />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
