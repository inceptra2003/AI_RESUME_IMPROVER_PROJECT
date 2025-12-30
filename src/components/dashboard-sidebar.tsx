"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Sparkles, MessageSquare, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Build Resume", href: "/dashboard/build", icon: FileText },
    { name: "Enhance Resume", href: "/dashboard/enhance", icon: Sparkles },
    { name: "Chatbot", href: "/dashboard/chatbot", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center px-6 border-b">
                <span className="text-xl font-bold text-blue-600 tracking-tight">CareerLift</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign out
                </Link>
            </div>
        </div>
    );
}
