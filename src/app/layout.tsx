import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/themeProvider";
import { SettingsProvider } from "@/context/SettingsContext";
import ToasterProvider from "@/context/ToasterProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "YuuSeek - Bang Search Engine",
    description: "A client-side bang search engine using DuckDuckGo bang data",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SettingsProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        // disableTransitionOnChange //? Para habilitar las animaciones de transición de tema
                    >
                        {children}
                        <ToasterProvider />
                    </ThemeProvider>
                </SettingsProvider>
            </body>
        </html>
    );
}
