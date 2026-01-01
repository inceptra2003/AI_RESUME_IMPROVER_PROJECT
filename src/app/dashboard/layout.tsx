import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ChatWidget } from "@/components/chat-widget";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Note: Session check removed as per user's disabled middleware preference
    // and manual removal in previous edit.

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar - hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
                <DashboardSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                {children}
                <ChatWidget />
            </main>
        </div>
    );
}
