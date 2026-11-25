"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Check, Copy, RotateCcw, ShieldCheck } from "lucide-react";

export const inputCls =
  "block w-full min-h-12 rounded-lg border border-sand-300 bg-paper px-3 text-base text-charcoal tabular-nums placeholder:text-stone-muted/55 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20";

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 font-semibold text-white hover:bg-accent-dark disabled:opacity-50";
export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sand-300 bg-paper px-4 font-semibold text-charcoal hover:bg-sand-100";

export function CalculatorCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-sand-200 bg-paper p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6"
    >
      {children}
    </section>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  suffix?: string;
};

/** Labeled text input with optional hint, error and suffix. */
export function Field({ id, label, hint, error, suffix, className = "", ...rest }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal-soft">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputCls} ${suffix ? "pr-12" : ""}`}
          {...rest}
        />
        {suffix && (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-stone-muted">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-stone-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div role="alert" className="mt-4 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
      <ul className="space-y-1">
        {errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

export type ResultLine = { label: string; value: string };

/** Results area announced to screen readers. */
export function ResultPanel({
  main,
  mainLabel,
  lines = [],
  explanation,
  copyText,
  onReset,
}: {
  main: string | null;
  mainLabel: string;
  lines?: ResultLine[];
  explanation?: ReactNode;
  copyText?: string;
  onReset?: () => void;
}) {
  return (
    <div className="mt-6 rounded-xl bg-sand-100 p-4 sm:p-5">
      <div aria-live="polite" aria-atomic="true">
        <p className="text-sm font-medium text-stone-muted">{mainLabel}</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-charcoal tabular-nums sm:text-5xl">{main ?? "—"}</p>
        {lines.length > 0 && (
          <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {lines.map((l) => (
              <div key={l.label} className="flex items-baseline justify-between gap-3 border-b border-sand-200 pb-1.5">
                <dt className="text-sm text-stone-muted">{l.label}</dt>
                <dd className="font-semibold text-charcoal tabular-nums">{l.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {explanation && <div className="mt-3 text-sm leading-relaxed text-charcoal-soft">{explanation}</div>}
      </div>
      {(copyText !== undefined || onReset) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {copyText !== undefined && <CopyButton text={copyText} disabled={!main} />}
          {onReset && (
            <button type="button" className={btnSecondary} onClick={onReset}>
              <RotateCcw aria-hidden className="h-4 w-4" />
              Limpar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("ok");
    } catch {
      setStatus("fail");
    }
    setTimeout(() => setStatus("idle"), 2500);
  }
  return (
    <>
      <button type="button" className={btnSecondary} onClick={copy} disabled={disabled}>
        {status === "ok" ? <Check aria-hidden className="h-4 w-4 text-accent" /> : <Copy aria-hidden className="h-4 w-4" />}
        {status === "ok" ? "Copiado!" : "Copiar resultado"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "ok" ? "Resultado copiado." : status === "fail" ? "Não foi possível copiar." : ""}
      </span>
      {status === "fail" && (
        <span className="self-center text-sm text-danger">Não foi possível copiar. Selecione o texto e copie manualmente.</span>
      )}
    </>
  );
}

export function PrivacyNote() {
  return (
    <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-stone-muted">
      <ShieldCheck aria-hidden className="mt-px h-4 w-4 shrink-0 text-accent" />
      Os cálculos são feitos no seu navegador; nada é enviado ou salvo. Não é preciso cadastro.
    </p>
  );
}

/** Segmented control (radio group) used for percentage presets, modes, etc. */
export function Segmented<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
}: {
  name: string;
  legend: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-sm font-medium text-charcoal-soft">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="inline-flex cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-11 items-center rounded-lg border px-3.5 text-sm font-medium peer-focus-visible:ring-2 peer-focus-visible:ring-accent ${
                value === o.value
                  ? "border-accent bg-accent-soft text-accent-dark"
                  : "border-sand-300 bg-paper text-charcoal-soft hover:bg-sand-100"
              }`}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Normalize a typed clock time on blur ("830" -> "08:30"). */
export function normalizeClockInput(raw: string, parse: (s: string) => { ok: boolean; minutes?: number }): string {
  const r = parse(raw);
  if (!r.ok || r.minutes === undefined) return raw;
  const h = Math.floor(r.minutes / 60);
  const m = r.minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
