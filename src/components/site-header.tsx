"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ShieldCheck } from "lucide-react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/market", label: "行情" },
  { href: "/news", label: "资讯" },
  { href: "/community", label: "社区" },
  { href: "/account", label: "用户" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#f1d3c3] bg-[rgba(255,248,243,0.92)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[#c84f2a] text-white shadow-[0_10px_24px_rgba(200,79,42,0.25)]">
            <BarChart3 size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-[#341812]">明鉴</p>
            <p className="text-sm text-[#8d5f53]">价值研判平台</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#c84f2a] text-white shadow-[0_10px_24px_rgba(200,79,42,0.22)]"
                    : "text-[#6d4a42] hover:bg-[#fff0e7] hover:text-[#b24322]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 text-sm text-[#8d5f53] lg:flex">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>仅供研究参考</span>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-5 pb-4 md:hidden sm:px-8 lg:px-10">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#c84f2a] text-white shadow-[0_10px_24px_rgba(200,79,42,0.22)]"
                  : "bg-white text-[#6d4a42] hover:text-[#b24322]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
