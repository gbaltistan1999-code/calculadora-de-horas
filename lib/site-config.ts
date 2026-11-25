/**
 * Public site configuration. No environment variables are used anywhere in
 * this project: edit this file to change the domain, name or navigation.
 */
export const siteConfig = {
  name: "Calculadora de Horas",
  // Production domain as connected in Vercel (note: "calculador", without the "a").
  url: "https://calculadordehoras.com",
  locale: "pt_BR",
  language: "pt-BR",
  description:
    "Calculadora de horas grátis: some e subtraia horas e minutos, veja o total em hora decimal e em reais. Rápida, sem cadastro e fácil de usar.",
  /**
   * LAUNCH REQUIREMENT: set the owner's real contact email before going live.
   * While this is null the Contato page shows a visible notice instead of an
   * address, and no fake email is ever displayed.
   */
  contactEmail: null as string | null,
  /** Google Search Console HTML-tag verification code (public, not a secret). */
  googleSiteVerification: "3ZmFTX_FjOBtBHg9IEHnVFvfFkJjxAgfDAqiWLKuIVg",
  /** Date the legal/content texts were last reviewed (DD/MM/AAAA). */
  lastUpdated: "25/11/2026",
} as const;

export type NavLink = { href: string; label: string; description: string };

export const calculatorLinks: NavLink[] = [
  {
    href: "/horas-trabalhadas",
    label: "Horas trabalhadas",
    description: "Entrada, saída e intervalo, com total diário e semanal.",
  },
  {
    href: "/horas-extras",
    label: "Horas extras",
    description: "Valor das horas extras com percentual configurável.",
  },
  {
    href: "/banco-de-horas",
    label: "Banco de horas",
    description: "Saldo positivo ou negativo entre horas previstas e trabalhadas.",
  },
  {
    href: "/adicional-noturno",
    label: "Adicional noturno",
    description: "Hora noturna reduzida e adicional sobre a hora diurna.",
  },
  {
    href: "/converter-hora-decimal",
    label: "Converter hora decimal",
    description: "Transforme hh:mm em decimal e decimal em hh:mm.",
  },
  {
    href: "/diferenca-entre-horarios",
    label: "Diferença entre horários",
    description: "Tempo entre dois horários, inclusive após a meia-noite.",
  },
];

export const legalLinks: { href: string; label: string }[] = [
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
  { href: "/aviso-legal", label: "Aviso Legal" },
];
