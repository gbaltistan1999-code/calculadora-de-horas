import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site-config";
import { CookieSettingsButton } from "./CookieSettingsButton";

/** Minimal footer: institutional and legal pages only, left-aligned. */
export function Footer() {
  const linkCls = "text-sm text-stone-muted hover:text-charcoal hover:underline underline-offset-4";
  return (
    <footer className="mt-20 border-t border-sand-200 bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <nav aria-label="Institucional">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/perguntas-frequentes" className={linkCls}>
                Perguntas frequentes
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={`${linkCls} text-left`} />
            </li>
          </ul>
        </nav>
        <p className="mt-6 text-xs text-stone-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
