import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { calculatorLinks } from "@/lib/site-config";
import { webApplicationJsonLd } from "@/lib/seo";
import { legalSources, type LegalSourceKey } from "@/data/legal-sources";
import type { CalculatorPageMeta } from "@/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";

/**
 * Shared template for the supporting calculator pages: breadcrumb, H1, intro,
 * calculator (above the fold), page-specific content, sources, related links,
 * FAQ, next step and disclaimer.
 */
export function CalculatorPageLayout({
  meta,
  calculator,
  children,
  sources = [],
  laborDisclaimer = false,
  nextStep,
}: {
  meta: CalculatorPageMeta;
  calculator: ReactNode;
  children: ReactNode;
  sources?: LegalSourceKey[];
  laborDisclaimer?: boolean;
  nextStep: ReactNode;
}) {
  const related = meta.related
    .map((p) => calculatorLinks.find((l) => l.href === p))
    .filter((l): l is (typeof calculatorLinks)[number] => !!l);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: meta.shortName, path: meta.path }]} />
      <JsonLd data={webApplicationJsonLd({ name: meta.h1, description: meta.description, path: meta.path })} />

      <header className="mb-6 mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">{meta.h1}</h1>
        <p className="mt-3 text-lg leading-relaxed text-charcoal-soft">{meta.intro}</p>
      </header>

      {calculator}

      {laborDisclaimer && (
        <p className="mt-4 rounded-lg border border-sand-200 bg-paper px-4 py-3 text-sm leading-relaxed text-stone-muted">
          <strong className="text-charcoal-soft">Estimativa informativa.</strong> Convenções e acordos coletivos,
          contratos de trabalho e categorias específicas (como rurais e domésticos) podem ter regras diferentes. Este
          resultado não é orientação jurídica, contábil nem substitui a folha de pagamento oficial. Veja o{" "}
          <Link href="/aviso-legal" className="text-accent underline underline-offset-2">
            Aviso Legal
          </Link>
          .
        </p>
      )}

      <article className="prose-content mt-10">{children}</article>

      {sources.length > 0 && (
        <section aria-labelledby="fontes" className="mt-10 rounded-2xl border border-sand-200 bg-paper p-5">
          <h2 id="fontes" className="text-lg font-bold text-charcoal">
            Fontes oficiais
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {sources.map((k) => (
              <li key={k}>
                <a
                  href={legalSources[k].url}
                  className="text-accent underline underline-offset-2 hover:text-accent-dark"
                  rel="noopener"
                >
                  {legalSources[k].label}
                </a>{" "}
                <span className="text-stone-muted">— planalto.gov.br</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-stone-muted">Textos legais consultados em 25/11/2026.</p>
        </section>
      )}

      <Faq items={meta.faqs} />

      <section aria-labelledby="relacionadas" className="mt-12">
        <h2 id="relacionadas" className="text-2xl font-bold tracking-tight text-charcoal">
          Calculadoras relacionadas
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          <li>
            <Link
              href="/"
              className="group flex h-full flex-col rounded-xl border border-sand-200 bg-paper p-4 hover:border-accent"
            >
              <span className="font-semibold text-charcoal group-hover:text-accent">Calculadora de horas</span>
              <span className="mt-1 text-sm text-stone-muted">Some e subtraia horas e minutos livremente.</span>
            </Link>
          </li>
          {related.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col rounded-xl border border-sand-200 bg-paper p-4 hover:border-accent"
              >
                <span className="font-semibold text-charcoal group-hover:text-accent">Calculadora de {l.label.toLowerCase()}</span>
                <span className="mt-1 text-sm text-stone-muted">{l.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl bg-charcoal p-6 text-sand-100 sm:p-8">
        <h2 className="text-xl font-bold text-paper">Próximo passo</h2>
        <div className="mt-2 leading-relaxed [&_a]:font-semibold [&_a]:text-paper [&_a]:underline [&_a]:underline-offset-4">
          {nextStep}
        </div>
        <Link
          href="/"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-paper px-4 font-semibold text-charcoal hover:bg-sand-100"
        >
          Abrir a calculadora de horas <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
