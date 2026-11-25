import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/** Layout for institutional and legal pages. */
export function StaticPage({
  title,
  path,
  crumb,
  lead,
  updated,
  children,
}: {
  title: string;
  path: string;
  crumb: string;
  lead?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: crumb, path }]} />
      <header className="mb-8 mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">{title}</h1>
        {lead && <p className="mt-3 text-lg leading-relaxed text-charcoal-soft">{lead}</p>}
        {updated && <p className="mt-2 text-sm text-stone-muted">Última atualização: {updated}</p>}
      </header>
      <article className="prose-content">{children}</article>
    </div>
  );
}
