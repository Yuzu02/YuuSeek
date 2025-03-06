import { SearchEngine } from "@/types/searchEngine";
import { BsBing } from "react-icons/bs";
import { FaGlobeAmericas, FaYahoo } from "react-icons/fa";
import { SiGoogle, SiDuckduckgo, SiEcosia } from "react-icons/si";

// Common search engines with their URLs and icons
export const predefinedEngines: SearchEngine[] = [
    {
        id: "google",
        name: "Google",
        url: "https://www.google.com/search?q={{{s}}}",
        icon: <SiGoogle className="w-5 h-5 text-[#4285F4]" />,
        feelingLuckyUrl: "https://www.google.com/search?btnI=1&q={{{s}}}",
    },
    {
        id: "bing",
        name: "Bing",
        url: "https://www.bing.com/search?q={{{s}}}",
        icon: <BsBing className="w-5 h-5 text-[#258FFA]" />,
        feelingLuckyUrl: "https://www.bing.com/search?q={{{s}}}&form=QBRE",
    },
    {
        id: "duckduckgo",
        name: "DuckDuckGo",
        url: "https://duckduckgo.com/?q={{{s}}}",
        icon: <SiDuckduckgo className="w-5 h-5 text-[#DE5833]" />,
        feelingLuckyUrl: "https://duckduckgo.com/?q=!ducky+{{{s}}}",
    },
    {
        id: "yahoo",
        name: "Yahoo",
        url: "https://search.yahoo.com/search?p={{{s}}}",
        icon: <FaYahoo className="w-5 h-5 text-[#5F01D1]" />,
        feelingLuckyUrl: "https://search.yahoo.com/search?p={{{s}}}",
    },
    {
        id: "ecosia",
        name: "Ecosia",
        url: "https://www.ecosia.org/search?q={{{s}}}",
        icon: <SiEcosia className="w-5 h-5 text-[#2B9B2B]" />,
        feelingLuckyUrl: "https://www.ecosia.org/search?q={{{s}}}",
    },
];

// Custom engine icon for fallback
export const customEngineIcon = (
    <FaGlobeAmericas className="w-5 h-5 text-blue-500" />
);
