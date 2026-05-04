"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MapPin, 
  Plane, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Destinations", href: "/admin/destinations", icon: MapPin },
  { label: "Trips", href: "/admin/trips", icon: Plane },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-primary/5 flex flex-col fixed left-0 top-0 z-[200]">
      {/* Logo */}
      <div className="p-6 border-b border-primary/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-primary">Xplorex</span>
          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-white shadow-3d-sm" 
                  : "text-primary/60 hover:bg-primary/5 hover:text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-primary/40 group-hover:text-primary")} />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-primary/60 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-semibold text-sm">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
