import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ChatWidget } from "@/components/chat-widget";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // 🔒 Protect dashboard (ONLY PLACE)
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <div className="hidden md:block">
                <DashboardSidebar />
            </div>

            <main className="flex-1 overflow-y-auto p-8 relative">
                {children}
                <ChatWidget />
            </main>
        </div>
    );
}
