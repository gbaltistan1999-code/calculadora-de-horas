import type { Metadata } from "next";
import Link from "next/link";
import { calculatorLinks } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-accent">Erro 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">Página não encontrada</h1>
      <p className="mt-3 text-lg leading-relaxed text-charcoal-soft">
        O endereço pode ter sido digitado errado ou a página não existe mais.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-accent px-5 font-semibold text-white hover:bg-accent-dark"
      >
        Ir para a calculadora de horas
      </Link>
      <h2 className="mt-12 text-lg font-bold text-charcoal">Outras calculadoras</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {calculatorLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-accent underline underline-offset-4 hover:text-accent-dark">
              Calculadora de {l.label.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
