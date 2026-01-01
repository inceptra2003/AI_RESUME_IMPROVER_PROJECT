import { createClient } from "@/lib/supabase/server";
import { FileText, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { DEMO_USER } from "@/lib/demo";
import { cookies } from "next/headers";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Use session already validated by layout
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const cookieStore = await cookies();
    const isDemo = cookieStore.get("demo_mode")?.value === "true";

    const user = session?.user || (isDemo ? DEMO_USER : null);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome to CareerLift
                </h1>
                <p className="mt-2 text-slate-600">
                    Your AI-powered resume workspace
                </p>
            </div>

            {isDemo && (
                <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">
                        Demo data shown for buildathon evaluation
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Resumes Created", value: "0", icon: FileText, sub: "Demo Mode" },
                    { label: "ATS Score Avg", value: "—", icon: TrendingUp, sub: "Requires Upload" },
                    { label: "Job Roles", value: "—", icon: Sparkles, sub: "Requires Analysis" },
                    { label: "Account Status", value: "Active", icon: AlertCircle, sub: "Free Tier" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500">
                                {stat.label}
                            </span>
                            <stat.icon className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                            {stat.value}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            {stat.sub}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-xs text-slate-400 pt-8 border-t border-slate-100">
                Logged in as:{" "}
                <span className="font-mono text-slate-500">
                    {user?.email ?? "demo@careerlift.ai"}
                </span>
            </div>
        </div>
    );
}
