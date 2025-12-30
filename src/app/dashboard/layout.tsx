import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar - hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
                <DashboardSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
