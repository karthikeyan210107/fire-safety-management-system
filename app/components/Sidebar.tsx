"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: "⌂",
  },
  {
    name: "Buildings",
    href: "/buildings",
    icon: "▣",
  },
  {
    name: "Inspections",
    href: "/inspections",
    icon: "✓",
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: "⚙",
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: "!",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808]/95 backdrop-blur-xl">

      {/* LOGO */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-xl">
            🔥
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-wider text-white">
              FIRE SAFETY
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Command Center
            </p>
          </div>

        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 px-4 py-6">

        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Navigation
        </p>

        {menuItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                active
                  ? "bg-red-500/10 text-red-400"
                  : "text-zinc-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-base ${
                  active
                    ? "bg-red-500/10"
                    : "bg-white/[0.03] group-hover:bg-white/10"
                }`}
              >
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>

              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-400" />
              )}
            </Link>
          );
        })}

      </nav>

      {/* SYSTEM STATUS */}
      <div className="border-t border-white/10 p-4">

        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-emerald-400">
              System Online
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
            Fire safety monitoring is active
          </p>

        </div>

      </div>

    </aside>
  );
}