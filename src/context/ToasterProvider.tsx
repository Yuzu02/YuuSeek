"use client";
import { Toaster } from "sonner";
import useCustomTheme from "@/hooks/useCustomTheme";

function ToasterProvider() {
    const theme = useCustomTheme();
    return (
        <div className="fixed top-4 right-4 z-50">
            <Toaster
                theme={theme}
                visibleToasts={3}
                duration={2500}
                dir="ltr"
            />
        </div>
    );
}

export default ToasterProvider;
