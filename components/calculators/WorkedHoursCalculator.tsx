"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { formatClock, formatDecimal, formatHM, formatHMWords } from "@/lib/format";
import { workedMinutes } from "@/lib/labor";
import { parseClockTime, parseDurationText } from "@/lib/time";
import { CalculatorCard, ErrorList, Field, inputCls, normalizeClockInput, PrivacyNote, ResultPanel, Segmented } from "./ui";

type DayRow = { entry: string; exit: string; brk: string };
const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const emptyWeek = (): DayRow[] => DAYS.map(() => ({ entry: "", exit: "", brk: "" }));

type DayCalc = { ok: true; minutes: number; span: number; brk: number } | { ok: false; error: string } | null;

/** Empty break = no break. A day with entry and exit empty is ignored. */
function calcDay(d: DayRow): DayCalc {
  if (d.entry.trim() === "" && d.exit.trim() === "") return null;
  const e = parseClockTime(d.entry);
  if (!e.ok) return { ok: false, error: `Entrada: ${e.error}` };
  const s = parseClockTime(d.exit);
  if (!s.ok) return { ok: false, error: `Saída: ${s.error}` };
  let brk = 0;
  if (d.brk.trim() !== "") {
    const b = parseDurationText(d.brk);
    if (!b.ok) return { ok: false, error: `Intervalo: ${b.error}` };
    brk = b.minutes;
  }
  const r = workedMinutes(e.minutes, s.minutes, brk);
  return r.ok ? { ...r, brk } : r;
}

function breakNote(c: DayCalc) {
  if (!c || !c.ok) return null;
  if (c.minutes > 360 && c.brk < 60)
    return "Para jornadas acima de 6 horas, a CLT (art. 71) prevê intervalo mínimo de 1 hora, salvo regra específica.";
  if (c.minutes > 240 && c.minutes <= 360 && c.brk < 15)
    return "Para jornadas entre 4 e 6 horas, a CLT (art. 71, §1º) prevê intervalo de 15 minutos.";
  return null;
}

export function WorkedHoursCalculator() {
  const uid = useId();
  const [mode, setMode] = useState<"day" | "week">("day");
  const [day, setDay] = useState<DayRow>({ entry: "08:00", exit: "17:00", brk: "1:00" });
  const [week, setWeek] = useState<DayRow[]>(emptyWeek);

  const blurClock = (v: string) => normalizeClockInput(v, parseClockTime);

  if (mode === "day") {
    const c = calcDay(day);
    const note = breakNote(c);
    return (
      <CalculatorCard title="Calculadora de horas trabalhadas">
        <ModeSwitch mode={mode} setMode={setMode} />
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field id={`${uid}-in`} label="Entrada" placeholder="08:00" inputMode="numeric" hint="Formato 24h (HH:MM)"
            value={day.entry} onChange={(e) => setDay({ ...day, entry: e.target.value })}
            onBlur={(e) => setDay({ ...day, entry: blurClock(e.target.value) })} />
          <Field id={`${uid}-out`} label="Saída" placeholder="17:00" inputMode="numeric" hint="Se for após meia-noite, tudo bem"
            value={day.exit} onChange={(e) => setDay({ ...day, exit: e.target.value })}
            onBlur={(e) => setDay({ ...day, exit: blurClock(e.target.value) })} />
          <Field id={`${uid}-brk`} label="Intervalo (pausa)" placeholder="1:00" hint="Ex.: 1:00, 0:30 ou 45min"
            value={day.brk} onChange={(e) => setDay({ ...day, brk: e.target.value })} />
        </div>
        <ErrorList errors={c && !c.ok ? [c.error] : []} />
        <ResultPanel
          mainLabel="Horas trabalhadas no dia"
          main={c && c.ok ? formatHM(c.minutes) : null}
          lines={
            c && c.ok
              ? [
                  { label: "Formato hh:mm", value: formatClock(c.minutes) },
                  { label: "Hora decimal", value: `${formatDecimal(c.minutes / 60)} h` },
                  { label: "Período total", value: formatHM(c.span) },
                  { label: "Intervalo descontado", value: formatHM(c.brk) },
                ]
              : []
          }
          explanation={
            c && c.ok ? (
              <>
                <p>
                  Da entrada à saída são {formatHMWords(c.span)}; menos o intervalo, ficam{" "}
                  <strong>{formatHMWords(c.minutes)}</strong> trabalhadas.
                </p>
                {c.minutes > 480 && (
                  <p className="mt-1">
                    Passou de 8 horas no dia? Veja quanto vale o excedente na{" "}
                    <Link href="/horas-extras" className="text-accent underline underline-offset-2">calculadora de horas extras</Link>.
                  </p>
                )}
                {note && <p className="mt-1">Observação: {note}</p>}
              </>
            ) : (
              <p>Informe entrada e saída para ver o total.</p>
            )
          }
          copyText={c && c.ok ? `Horas trabalhadas: ${formatHM(c.minutes)} (${formatDecimal(c.minutes / 60)} h)` : ""}
          onReset={() => setDay({ entry: "", exit: "", brk: "" })}
        />
        <PrivacyNote />
      </CalculatorCard>
    );
  }

  const calcs = week.map(calcDay);
  const errors = calcs.flatMap((c, i) => (c && !c.ok ? [`${DAYS[i]} — ${c.error}`] : []));
  const valid = calcs.filter((c): c is Extract<DayCalc, { ok: true }> => !!c && c.ok);
  const total = valid.reduce((a, c) => a + c.minutes, 0);
  const updateDay = (i: number, patch: Partial<DayRow>) =>
    setWeek((w) => w.map((d, j) => (j === i ? { ...d, ...patch } : d)));

  return (
    <CalculatorCard title="Calculadora de horas trabalhadas na semana">
      <ModeSwitch mode={mode} setMode={setMode} />
      <div className="relative mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-separate border-spacing-y-2 text-sm">
          <caption className="sr-only">Horários de segunda a domingo</caption>
          <thead>
            <tr className="text-left text-stone-muted">
              <th scope="col" className="pr-2 font-medium">Dia</th>
              <th scope="col" className="px-1 font-medium">Entrada</th>
              <th scope="col" className="px-1 font-medium">Saída</th>
              <th scope="col" className="px-1 font-medium">Intervalo</th>
              <th scope="col" className="pl-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {week.map((d, i) => {
              const c = calcs[i];
              return (
                <tr key={DAYS[i]}>
                  <th scope="row" className="pr-2 text-left font-medium text-charcoal">{DAYS[i]}</th>
                  <td className="px-1">
                    <input aria-label={`Entrada — ${DAYS[i]}`} className={inputCls} inputMode="numeric" placeholder="08:00"
                      value={d.entry} aria-invalid={(c && !c.ok) || undefined}
                      onChange={(e) => updateDay(i, { entry: e.target.value })}
                      onBlur={(e) => updateDay(i, { entry: blurClock(e.target.value) })} />
                  </td>
                  <td className="px-1">
                    <input aria-label={`Saída — ${DAYS[i]}`} className={inputCls} inputMode="numeric" placeholder="17:00"
                      value={d.exit} aria-invalid={(c && !c.ok) || undefined}
                      onChange={(e) => updateDay(i, { exit: e.target.value })}
                      onBlur={(e) => updateDay(i, { exit: blurClock(e.target.value) })} />
                  </td>
                  <td className="px-1">
                    <input aria-label={`Intervalo — ${DAYS[i]}`} className={inputCls} placeholder="1:00"
                      value={d.brk} onChange={(e) => updateDay(i, { brk: e.target.value })} />
                  </td>
                  <td className="pl-2 text-right font-semibold tabular-nums text-charcoal">
                    {c && c.ok ? formatHM(c.minutes) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-xs text-stone-muted">Dias sem entrada e saída são ignorados (folga).</p>
      <ErrorList errors={errors} />
      <ResultPanel
        mainLabel="Total da semana"
        main={valid.length ? formatHM(total) : null}
        lines={
          valid.length
            ? [
                { label: "Formato hh:mm", value: formatClock(total) },
                { label: "Hora decimal", value: `${formatDecimal(total / 60)} h` },
                { label: "Dias trabalhados", value: String(valid.length) },
                { label: "Média por dia", value: formatHM(Math.round(total / valid.length)) },
              ]
            : []
        }
        explanation={
          valid.length ? (
            <p>
              Soma dos {valid.length} dia(s) preenchido(s): <strong>{formatHMWords(total)}</strong>.
            </p>
          ) : (
            <p>Preencha pelo menos um dia.</p>
          )
        }
        copyText={valid.length ? `Total semanal: ${formatHM(total)} (${formatDecimal(total / 60)} h)` : ""}
        onReset={() => setWeek(emptyWeek())}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}

function ModeSwitch({ mode, setMode }: { mode: "day" | "week"; setMode: (m: "day" | "week") => void }) {
  return (
    <Segmented
      name="modo-horas-trabalhadas"
      legend="O que você quer calcular?"
      value={mode}
      onChange={setMode}
      options={[
        { value: "day", label: "Um dia" },
        { value: "week", label: "Semana (segunda a domingo)" },
      ]}
    />
  );
}
