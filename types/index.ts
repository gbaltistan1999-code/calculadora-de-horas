export type FaqItem = { question: string; answer: string };

export type CalculatorPageMeta = {
  path: string;
  /** SEO <title>. */
  title: string;
  description: string;
  h1: string;
  /** Short name for breadcrumbs and structured data. */
  shortName: string;
  intro: string;
  /** Paths of related calculator pages. */
  related: string[];
  faqs: FaqItem[];
};
