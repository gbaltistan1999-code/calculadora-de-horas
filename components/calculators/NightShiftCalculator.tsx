"use client";

import { useId, useState } from "react";
import { formatBRL, formatDecimal, formatHM } from "@/lib/format";
import { nightMinutesInShift, nightPremium } from "@/lib/labor";
import { parseClockTime, parseDecimal } from "@/lib/time";
import { CalculatorCard, ErrorList, Field, normalizeClockInput, PrivacyNote, ResultPanel, Segmented } from "./ui";

type Preset = "urbano" | "domestico" | "lavoura" | "pecuaria" | "custom";

/** Defaults per category; sources in data/legal-sources.ts. All remain editable. */
const PRESETS: Record<Exclude<Preset, "custom">, { start: string; end: string; pct: string; reduced: boolean; label: string }> = {
  urbano: { start: "22:00", end: "05:00", pct: "20", reduced: true, label: "Urbano (CLT)" },
  domestico: { start: "22:00", end: "05:00", pct: "20", reduced: true, label: "Doméstico" },
  lavoura: { start: "21:00", end: "05:00", pct: "25", reduced: false, label: "Rural — lavoura" },
  pecuaria: { start: "20:00", end: "04:00", pct: "25", reduced: false, label: "Rural — pecuária" },
};

export function NightShiftCalculator() {
  const uid = useId();
  const [preset, setPreset] = useState<Preset>("urbano");
  const [shiftStart, setShiftStart] = useState("22:00");
  const [shiftEnd, setShiftEnd] = useState("05:00");
  const [winStart, setWinStart] = useState("22:00");
  const [winEnd, setWinEnd] = useState("05:00");
  const [pct, setPct] = useState("20");
  const [reduced, setReduced] = useState(true);
  const [rate, setRate] = useState("");

  function applyPreset(p: Preset) {
    setPreset(p);
    if (p === "custom") return;
    const v = PRESETS[p];
    setWinStart(v.start);
    setWinEnd(v.end);
    setPct(v.pct);
    setReduced(v.reduced);
  }
  const markCustom = () => setPreset("custom");

  const errors: string[] = [];
  const s = parseClockTime(shiftStart);
  const e = parseClockTime(shiftEnd);
  const ws = parseClockTime(winStart);
  const we = parseClockTime(winEnd);
  if (!s.ok) errors.push(`Início do trabalho: ${s.error}`);
  if (!e.ok) errors.push(`Fim do trabalho: ${e.error}`);
  if (!ws.ok) errors.push(`Início do período noturno: ${ws.error}`);
  if (!we.ok) errors.push(`Fim do período noturno: ${we.error}`);
  const p = parseDecimal(pct, "Adicional");
  if (!p.ok) errors.push(p.error);
  const rp = rate.trim() ? parseDecimal(rate, "Valor da hora") : null;
  if (rp && !rp.ok) errors.push(rp.error);

  const ready = s.ok && e.ok && ws.ok && we.ok && p.ok;
  const realNight = ready ? nightMinutesInShift(s.minutes, e.minutes, ws.minutes, we.minutes) : 0;
  const hourly = rp && rp.ok ? rp.value : 0;
  const prem = ready && p.ok ? nightPremium({ realNightMinutes: realNight, useReducedHour: reduced, hourlyRate: hourly, percent: p.value }) : null;
  const computedRounded = prem ? Math.round(prem.computedMinutes) : 0;

  const blur = (v: string) => normalizeClockInput(v, parseClockTime);

  return (
    <CalculatorCard title="Calculadora de adicional noturno">
      <Segmented
        name={`${uid}-preset`}
        legend="Categoria (preenche os padrões legais; tudo continua editável)"
        value={preset}
        onChange={applyPreset}
        options={[
          ...Object.entries(PRESETS).map(([k, v]) => ({ value: k as Preset, label: v.label })),
          { value: "custom" as Preset, label: "Personalizado" },
        ]}
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-ss`} label="Início do trabalho" placeholder="22:00" inputMode="numeric" value={shiftStart}
          onChange={(ev) => setShiftStart(ev.target.value)} onBlur={(ev) => setShiftStart(blur(ev.target.value))} />
        <Field id={`${uid}-se`} label="Fim do trabalho" placeholder="05:00" inputMode="numeric" value={shiftEnd}
          hint="Pode ser no dia seguinte" onChange={(ev) => setShiftEnd(ev.target.value)} onBlur={(ev) => setShiftEnd(blur(ev.target.value))} />
      </div>

      <details className="mt-5 rounded-xl border border-sand-200 p-4" open={preset === "custom"}>
        <summary className="cursor-pointer font-medium text-charcoal">Regras do cálculo (período, adicional e hora reduzida)</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field id={`${uid}-ws`} label="Período noturno — início" inputMode="numeric" value={winStart}
            onChange={(ev) => { setWinStart(ev.target.value); markCustom(); }} onBlur={(ev) => setWinStart(blur(ev.target.value))} />
          <Field id={`${uid}-we`} label="Período noturno — fim" inputMode="numeric" value={winEnd}
            onChange={(ev) => { setWinEnd(ev.target.value); markCustom(); }} onBlur={(ev) => setWinEnd(blur(ev.target.value))} />
          <Field id={`${uid}-pct`} label="Adicional noturno" inputMode="decimal" suffix="%" value={pct}
            onChange={(ev) => { setPct(ev.target.value); markCustom(); }} />
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-charcoal-soft">
          <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--color-accent)]" checked={reduced}
            onChange={(ev) => { setReduced(ev.target.checked); markCustom(); }} />
          <span>
            Aplicar hora noturna reduzida (52 minutos e 30 segundos). Prevista na CLT e para domésticos; não se aplica ao
            trabalhador rural.
          </span>
        </label>
      </details>

      <Field id={`${uid}-rate`} label="Valor da hora diurna (opcional, para calcular em R$)" inputMode="decimal"
        placeholder="10,00" suffix="R$" value={rate} onChange={(ev) => setRate(ev.target.value)} className="mt-5 sm:w-1/2" />

      <ErrorList errors={errors} />
      <ResultPanel
        mainLabel={reduced ? "Horas noturnas a pagar (com hora reduzida)" : "Horas noturnas"}
        main={prem ? formatHM(computedRounded) : null}
        lines={
          prem
            ? [
                { label: "Tempo real no período noturno", value: formatHM(realNight) },
                { label: "Horas noturnas em decimal", value: `${formatDecimal(prem.computedMinutes / 60)} h` },
                ...(hourly > 0
                  ? [
                      { label: `Adicional (${formatDecimal(p.ok ? p.value : 0)}%)`, value: formatBRL(prem.premium) },
                      { label: "Horas noturnas + adicional", value: formatBRL(prem.totalWithBase) },
                    ]
                  : []),
              ]
            : []
        }
        explanation={
          prem ? (
            realNight === 0 ? (
              <p>Nenhuma parte do horário informado cai no período noturno configurado.</p>
            ) : (
              <p>
                {formatHM(realNight)} de relógio entre {winStart} e {winEnd}
                {reduced ? <> ÷ 52,5 min × 60 = <strong>{formatHM(computedRounded)}</strong> noturnas (arredondado ao minuto)</> : null}.
                {hourly > 0 && <> Adicional = {formatDecimal(prem.computedMinutes / 60, 4)} h × {formatBRL(hourly)} × {formatDecimal(p.ok ? p.value : 0)}%.</>}
                {hourly === 0 && " Informe o valor da hora para ver o adicional em reais."}
              </p>
            )
          ) : (
            <p>Informe o horário de trabalho.</p>
          )
        }
        copyText={prem ? `Horas noturnas: ${formatHM(computedRounded)}${hourly > 0 ? ` — adicional ${formatBRL(prem.premium)}` : ""}` : ""}
        onReset={() => { setShiftStart(""); setShiftEnd(""); setRate(""); applyPreset("urbano"); }}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}
