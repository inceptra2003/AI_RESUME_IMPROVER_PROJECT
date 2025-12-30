import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "./theme-toggle";
import { User, Mail, Moon, Sun, Settings } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <User className="h-8 w-8 text-blue-600" />
                Your Profile
            </h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* User Info Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 shadow-sm p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-bold">
                            {(user.email?.[0] || "U").toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Welcome back,</p>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t dark:border-slate-800">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <Mail className="h-5 w-5 text-slate-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <Settings className="h-5 w-5 text-slate-400" />
                            <span>Account ID: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{user.id.slice(0, 8)}...</code></span>
                        </div>
                    </div>
                </div>

                {/* Settings Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Settings className="h-5 w-5" /> Preferences
                    </h3>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-800">
                        <div className="space-y-1">
                            <p className="font-medium text-slate-900 dark:text-slate-200">Appearance</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
