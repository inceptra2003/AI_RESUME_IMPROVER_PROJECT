"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-32 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />;
    }

    return (
        <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                title="Light Mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                title="Dark Mode"
            >
                <Moon className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-md transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                title="System Preference"
            >
                <Laptop className="h-4 w-4" />
            </button>
        </div>
    );
}
