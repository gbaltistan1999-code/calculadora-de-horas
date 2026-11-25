"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { calculatorLinks } from "@/lib/site-config";

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (href: string) => pathname === href;
  const linkCls = (active: boolean) =>
    `rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-sand-100 hover:text-charcoal ${
      active ? "text-charcoal" : "text-charcoal-soft"
    }`;

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
        <Link href="/" className={linkCls(isActive("/"))} aria-current={isActive("/") ? "page" : undefined}>
          Início
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className={`${linkCls(calculatorLinks.some((l) => isActive(l.href)))} inline-flex items-center gap-1`}
            aria-expanded={dropdownOpen}
            aria-controls="menu-calculadoras"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            Calculadoras
            <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <ul
              id="menu-calculadoras"
              className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-sand-200 bg-paper p-2 shadow-lg"
            >
              {calculatorLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-lg px-3 py-2.5 hover:bg-sand-100"
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    <span className="block text-sm font-semibold text-charcoal">{l.label}</span>
                    <span className="block text-xs text-stone-muted">{l.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href="/sobre" className={linkCls(isActive("/sobre"))} aria-current={isActive("/sobre") ? "page" : undefined}>
          Sobre
        </Link>
      </nav>

      {/* Mobile */}
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-charcoal hover:bg-sand-100 md:hidden"
        aria-expanded={mobileOpen}
        aria-controls="menu-mobile"
        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
      </button>
      {mobileOpen && (
        <nav
          id="menu-mobile"
          aria-label="Menu móvel"
          className="absolute inset-x-0 top-full z-50 border-b border-sand-200 bg-paper px-4 pb-5 pt-2 shadow-md md:hidden"
        >
          <ul className="space-y-1">
            <li>
              <Link href="/" className="block rounded-lg px-3 py-3 font-medium hover:bg-sand-100">
                Início
              </Link>
            </li>
            <li className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-stone-muted">
              Calculadoras
            </li>
            {calculatorLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 hover:bg-sand-100"
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-sand-200 pt-1">
              <Link href="/sobre" className="block rounded-lg px-3 py-3 font-medium hover:bg-sand-100">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
