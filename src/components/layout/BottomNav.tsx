"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Home, LayoutDashboard, User, Shield } from "lucide-react";
import clsx from "clsx";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: "Ana Sayfa", href: "/", icon: Home },
    ...(user
      ? [
          {
            label: "Panel",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            label: "Profil",
            href: "/profile",
            icon: User,
          },
          ...(user.role === "admin"
            ? [
                {
                  label: "Admin",
                  href: "/admin",
                  icon: Shield,
                },
              ]
            : []),
        ]
      : [
          {
            label: "Giriş",
            href: "/login",
            icon: User,
          },
        ]),
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center flex-1 h-full min-h-[44px] min-w-[44px] py-1 text-xs font-medium transition",
                isActive
                  ? "text-brand-600 font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Icon className={clsx("w-5 h-5 mb-1", isActive && "stroke-[2.5px]")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
