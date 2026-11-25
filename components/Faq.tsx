import { faqJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/types";
import { JsonLd } from "./JsonLd";

/** Visible FAQ list. FAQPage JSON-LD is emitted from the same data. */
export function Faq({
  items,
  title = "Perguntas frequentes",
  id = "perguntas-frequentes",
  withSchema = true,
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
  withSchema?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-2xl font-bold tracking-tight text-charcoal">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-paper">
        {items.map((f) => (
          <details key={f.question} className="group px-5 py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
              {f.question}
              <span
                aria-hidden
                className="text-xl leading-none text-stone-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-4 leading-relaxed text-charcoal-soft">{f.answer}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqJsonLd(items)} />}
    </section>
  );
}
