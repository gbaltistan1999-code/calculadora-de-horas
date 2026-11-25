"use client";

import { useId, useState } from "react";
import { formatClock, formatDecimal, formatHM, formatHMWords, formatInteger } from "@/lib/format";
import { clockDifference, parseClockTime } from "@/lib/time";
import { CalculatorCard, ErrorList, Field, normalizeClockInput, PrivacyNote, ResultPanel } from "./ui";

export function TimeDifferenceCalculator() {
  const uid = useId();
  const [start, setStart] = useState("22:00");
  const [end, setEnd] = useState("06:00");
  const [fullDay, setFullDay] = useState(false);

  const s = parseClockTime(start);
  const e = parseClockTime(end);
  const errors: string[] = [];
  if (start.trim() && !s.ok) errors.push(`Horário inicial: ${s.error}`);
  if (end.trim() && !e.ok) errors.push(`Horário final: ${e.error}`);
  const ready = s.ok && e.ok;
  const diff = ready ? clockDifference(s.minutes, e.minutes, fullDay) : null;
  const crosses = ready && e.minutes < s.minutes;
  const equal = ready && e.minutes === s.minutes;
  const blur = (v: string) => normalizeClockInput(v, parseClockTime);

  return (
    <CalculatorCard title="Calculadora de diferença entre horários">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-s`} label="Horário inicial" placeholder="08:00" inputMode="numeric" hint="Formato 24h (HH:MM)"
          value={start} onChange={(ev) => setStart(ev.target.value)} onBlur={(ev) => setStart(blur(ev.target.value))} />
        <Field id={`${uid}-e`} label="Horário final" placeholder="17:30" inputMode="numeric" hint="Se for menor que o inicial, conta como dia seguinte"
          value={end} onChange={(ev) => setEnd(ev.target.value)} onBlur={(ev) => setEnd(blur(ev.target.value))} />
      </div>
      {equal && (
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-charcoal-soft">
          <input type="checkbox" className="h-5 w-5 accent-[var(--color-accent)]" checked={fullDay}
            onChange={(ev) => setFullDay(ev.target.checked)} />
          Horários iguais: considerar 24 horas (um dia inteiro) em vez de zero
        </label>
      )}
      <ErrorList errors={errors} />
      <ResultPanel
        mainLabel="Diferença"
        main={diff !== null ? formatHM(diff) : null}
        lines={
          diff !== null
            ? [
                { label: "Formato hh:mm", value: formatClock(diff) },
                { label: "Hora decimal", value: `${formatDecimal(diff / 60)} h` },
                { label: "Total em minutos", value: `${formatInteger(diff)} min` },
              ]
            : []
        }
        explanation={
          diff !== null ? (
            <p>
              De {start} até {end}
              {crosses ? " do dia seguinte (passando pela meia-noite)" : ""}: <strong>{formatHMWords(diff)}</strong>.
              {crosses && (
                <> Cálculo: até 24:00 são {formatHM(1440 - (s.ok ? s.minutes : 0))}, mais {formatHM(e.ok ? e.minutes : 0)} após a meia-noite.</>
              )}
            </p>
          ) : (
            <p>Informe os dois horários.</p>
          )
        }
        copyText={diff !== null ? `De ${start} a ${end}: ${formatHM(diff)} (${formatDecimal(diff / 60)} h)` : ""}
        onReset={() => { setStart(""); setEnd(""); setFullDay(false); }}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}
