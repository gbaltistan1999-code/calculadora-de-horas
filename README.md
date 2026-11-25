# Calculadora de Horas

Static, SEO-focused Next.js (App Router) + Tailwind CSS website for **https://calculadoradehoras.com**, targeting the Brazilian keyword **"calculadora de horas"**. All user-facing text is Brazilian Portuguese. All calculators run in the browser — no backend, database, API keys or environment variables.

## Quick start

Requirements: Node.js 20.9+ (tested with Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (Vitest) for the calculation library
npm run typecheck  # TypeScript
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run build      # production build (every route is prerendered as static)
npm start          # serve the production build
```

## Deploy

Every page is static, so any Next.js host works (Vercel, Netlify, Cloudflare, or your own Node server with `npm run build && npm start`). No environment variables need to be configured.

To change the domain, name, contact email or navigation, edit **`lib/site-config.ts`**. Canonicals, sitemap, robots.txt and structured data all read from it.

## Project structure

```
app/                     Routes (one folder per page), layout, sitemap.ts, robots.ts, not-found.tsx, icon.svg
components/              Header, SiteNav (client), Footer, CookieConsent (client), Breadcrumbs, Faq,
                         CalculatorPageLayout, StaticPage, ContactForm (client), JsonLd
components/calculators/  One client component per calculator + shared UI primitives (ui.tsx)
lib/time.ts              Pure time arithmetic: parsing, whole-minute (base 60) math, clock differences
lib/format.ts            pt-BR formatting: 9h10, 09:10, "9 horas e 10 minutos", 7,5, R$ 1.234,56
lib/labor.ts             Worked hours, overtime, night premium, time bank (all rates are parameters)
lib/consent.ts           Consent storage (localStorage key "cdh-consent") and events
lib/seo.ts               Metadata builder and JSON-LD helpers
lib/__tests__/           Vitest unit tests
data/                    Page metadata, FAQs (shared by visible FAQ + FAQPage schema), legal sources
types/                   Shared TypeScript types
```

**Rules for maintainers**

- Do arithmetic in **whole minutes** (`lib/time.ts`), never in decimal hours. Convert to decimal only for display or money.
- Keep calculators as small client components; page content stays in Server Components.
- FAQ structured data comes from the same array as the visible FAQ, so the two always match. Don't add FAQ schema without visible FAQs.
- Labor-law figures must come from planalto.gov.br (see `data/legal-sources.ts`) and stay **editable** in the UI.

## Documented calculator behavior

| Situation | Behavior |
|---|---|
| Empty hours/minutes field | Counts as 0. A completely empty row is ignored. |
| Minutes ≥ 60 in a field | Rejected with a message (no silent normalization). |
| Negative number / letters in a field | Rejected; use the "− subtrair" operation instead. |
| Total > 24h | Allowed (durations, e.g. 30h30). |
| Subtractions exceed additions | Negative total shown with "−" (e.g. −1h15). |
| Clock input "830", "8h30", "8:30" | Read as 08:30 (24-hour clock). |
| End time ≤ start time | Treated as crossing midnight (22:00 → 06:00 = 8h00). Equal times = 0, optionally 24h. |
| Money | `minutes × rate / 60`, rounded half-up to centavos only at the end. |
| Storage | Calculator values are never stored or transmitted. |

## Keyword map

| Page | Primary intent / keywords |
|---|---|
| `/` | calculadora de horas, somar horas, subtrair horas, calculadora de horas e minutos, calcular horas |
| `/horas-trabalhadas` | calculadora de horas trabalhadas, calcular horas trabalhadas, cartão de ponto, jornada |
| `/horas-extras` | calculadora de horas extras, valor hora extra 50% / 100%, divisor 220 |
| `/banco-de-horas` | calculadora de banco de horas, saldo banco de horas |
| `/adicional-noturno` | calculadora de adicional noturno, hora noturna reduzida |
| `/converter-hora-decimal` | converter horas em decimal, hora decimal, minutos em decimal |
| `/diferenca-entre-horarios` | diferença entre horários, calcular horas entre dois horários, após meia-noite |

Cannibalization guard: there are deliberately **no** separate "somar horas" or "subtrair horas" pages. The homepage owns those intents. Search volume figures were not invented; validate them with your own keyword tool.

## Internal linking

- The homepage links to every calculator (the "Outras calculadoras" section plus links inside the content).
- Each calculator page links back to `/` with varied anchors ("calculadora de horas", "calculadora de horas e minutos", …) and to related pages: trabalhadas ↔ extras ↔ banco; decimal ↔ extras; noturno ↔ diferença.
- Breadcrumbs on every inner page (with BreadcrumbList schema). The footer is deliberately minimal and keyword-free: it links only to the trust and legal pages and the FAQ, plus a "Configurações de cookies" button. Calculator pages are reached through the header menu and the homepage's "Outras calculadoras" section.

## Structured data

- `/`: WebSite, WebApplication, FAQPage
- Calculator pages: BreadcrumbList, WebApplication (`isAccessibleForFree: true`, price 0 BRL, no ratings), FAQPage
- `/perguntas-frequentes`: BreadcrumbList, FAQPage (general questions only, not duplicates of page FAQs)
- Other pages: BreadcrumbList
- Organization: **not included**, because no verified organization details exist yet. Add it once the owner provides them.

## Cookie consent (LGPD)

The only browser storage is `localStorage["cdh-consent"]`, which holds the visitor's choice. The Análise and Marketing categories are off by default and currently gate nothing, because no such scripts exist. If you add an analytics tool later:

1. Load it only when `readConsent()?.analytics === true` (from `lib/consent.ts`), and listen for the `CONSENT_EVENT` window event.
2. Update `/politica-de-privacidade` and `/politica-de-cookies` **before** enabling it.
3. Update the banner text in `components/CookieConsent.tsx`, which currently says no analytics or advertising cookies are used.

## Launch checklist (owner action required)

- [ ] **Contact email**: set `contactEmail` in `lib/site-config.ts`. Until then, `/contato` shows a visible "not configured yet" notice and no form.
- [ ] **Legal review** of `/politica-de-privacidade`, `/termos-de-uso`, `/aviso-legal` and the CLT statements on the labor pages by a qualified Brazilian professional.
- [ ] **Hosting provider**: name it in the Privacy Policy (section 4) and check its log-retention policy.
- [ ] **EC 141/2026**: the working-week reduction (44h → 42h about two months after publication on 16/10/2026, then 40h one year later) is described from the official text. Re-check the effective dates, how it applies to domestic workers (LC 150/2015 art. 2 still says 44h) and the divisor guidance once the transition starts.
- [ ] Re-verify all legal figures on planalto.gov.br and update `lastUpdated` in `lib/site-config.ts` and the "consultados em" dates.
- [ ] After deploy: run PageSpeed Insights, validate structured data with Google's Rich Results Test, and submit `sitemap.xml` in Google Search Console.

## Brand assets

- `public/logo.png`: header wordmark (555×144, shown at 40px tall through `next/image`).
- `app/icon.png` (192×192, transparent corners) and `app/apple-icon.png` (180×180, opaque): favicons, wired up automatically by Next.js.
- `app/opengraph-image.png` (1200×630): social sharing image, wired up automatically.
- The accent color `--color-accent` in `app/globals.css` matches the logo teal (`#14736A`).
