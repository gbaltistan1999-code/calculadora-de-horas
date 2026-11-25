import Link from "next/link";
import { calculatorLinks, legalLinks, siteConfig } from "@/lib/site-config";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  const linkCls = "text-sm text-stone-muted hover:text-charcoal hover:underline underline-offset-4";
  return (
    <footer className="mt-20 border-t border-sand-200 bg-paper">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-bold text-charcoal">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-muted">
            Calculadoras de horas gratuitas que funcionam no seu navegador. Resultados informativos; não substituem
            orientação jurídica, contábil ou de RH.
          </p>
        </div>
        <nav aria-label="Calculadoras">
          <p className="text-sm font-semibold text-charcoal">Calculadoras</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/" className={linkCls}>
                Calculadora de horas
              </Link>
            </li>
            {calculatorLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className="text-sm font-semibold text-charcoal">Institucional</p>
          <ul className="mt-3 space-y-2">
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
      </div>
      <div className="border-t border-sand-200">
        <p className="mx-auto max-w-5xl px-4 py-5 text-xs text-stone-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Os cálculos são feitos localmente no seu navegador.
        </p>
      </div>
    </footer>
  );
}
