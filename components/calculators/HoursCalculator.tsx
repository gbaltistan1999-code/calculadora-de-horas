"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatBRL, formatClock, formatDecimal, formatHM, formatHMWords, formatInteger, moneyForMinutes } from "@/lib/format";
import { hoursMinutesToMinutes, parseDecimal, sumDurations, type DurationEntry, type Operation } from "@/lib/time";
import { btnPrimary, btnSecondary, CalculatorCard, ErrorList, Field, inputCls, PrivacyNote, ResultPanel } from "./ui";

type Row = { key: number; op: Operation; hours: string; minutes: string };

const initialRows = (): Row[] => [
  { key: 1, op: "add", hours: "", minutes: "" },
  { key: 2, op: "add", hours: "", minutes: "" },
  { key: 3, op: "add", hours: "", minutes: "" },
];

const MAX_ROWS = 30;

/**
 * Main hours calculator. Behavior (documented):
 * - Empty fields count as zero; a fully empty row is ignored.
 * - Minutes must be 0–59; invalid rows are excluded and reported.
 * - Totals may exceed 24h and may be negative.
 */
export function HoursCalculator() {
  const uid = useId();
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [rate, setRate] = useState("");
  const nextKey = useRef(4);
  const resultRef = useRef<HTMLDivElement>(null);

  const rowResults = rows.map((r) => ({ row: r, parsed: hoursMinutesToMinutes(r.hours, r.minutes) }));
  const errors: string[] = [];
  const entries: DurationEntry[] = [];
  rowResults.forEach(({ row, parsed }, i) => {
    if (!parsed.ok) errors.push(`Linha ${i + 1} — ${parsed.error}`);
    else if (row.hours.trim() !== "" || row.minutes.trim() !== "") entries.push({ op: row.op, minutes: parsed.minutes });
  });

  const rateParsed = rate.trim() === "" ? null : parseDecimal(rate, "Valor por hora");
  if (rateParsed && !rateParsed.ok) errors.push(rateParsed.error);

  const hasInput = entries.length > 0;
  const total = sumDurations(entries);
  const money = rateParsed && rateParsed.ok && hasInput ? moneyForMinutes(total, rateParsed.value) : null;

  const lines = hasInput
    ? [
        { label: "Formato hh:mm", value: formatClock(total) },
        { label: "Hora decimal", value: `${formatDecimal(total / 60)} h` },
        { label: "Total em minutos", value: `${formatInteger(total)} min` },
        ...(money !== null ? [{ label: "Valor total", value: formatBRL(money) }] : []),
      ]
    : [];

  // Explain carry-over when the minutes column sums to 60 or more.
  const addedMinutes = entries.filter((e) => e.op === "add").reduce((a, e) => a + (e.minutes % 60), 0);
  const explanation = hasInput ? (
    <>
      <p>
        Total: <strong>{formatHMWords(total)}</strong>
        {total < 0 && " (as subtrações superam as somas)"}.
      </p>
      {addedMinutes >= 60 && (
        <p className="mt-1">
          Os minutos somados dão {addedMinutes} min = {formatHMWords(addedMinutes)}: a cada 60 minutos, soma-se 1 hora.
        </p>
      )}
      {money !== null && (
        <p className="mt-1">
          Valor: {formatDecimal(total / 60, 4)} h × {formatBRL(rateParsed && rateParsed.ok ? rateParsed.value : 0)} ={" "}
          {formatBRL(money)} (arredondado ao centavo).
        </p>
      )}
    </>
  ) : (
    <p>Preencha as horas e os minutos para ver o total.</p>
  );

  const copyText = hasInput
    ? `Total: ${formatHM(total)} (${formatClock(total)}) = ${formatDecimal(total / 60)} h = ${formatInteger(total)} min${
        money !== null ? ` — ${formatBRL(money)}` : ""
      }`
    : "";

  function update(key: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }
  function addRow() {
    if (rows.length >= MAX_ROWS) return;
    const key = nextKey.current++;
    setRows((rs) => [...rs, { key, op: "add", hours: "", minutes: "" }]);
    requestAnimationFrame(() => document.getElementById(`${uid}-h-${key}`)?.focus());
  }
  function removeRow(key: number) {
    setRows((rs) => (rs.length <= 1 ? rs : rs.filter((r) => r.key !== key)));
  }
  function reset() {
    setRows(initialRows());
    setRate("");
    nextKey.current = 4;
    requestAnimationFrame(() => document.getElementById(`${uid}-h-1`)?.focus());
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    resultRef.current?.focus();
  }

  return (
    <CalculatorCard title="Calculadora de horas">
      <form onSubmit={onSubmit} noValidate>
        <div className="hidden grid-cols-[7.5rem_1fr_1fr_2.75rem] gap-3 px-1 pb-2 text-sm font-medium text-stone-muted sm:grid">
          <span>Operação</span>
          <span>Horas</span>
          <span>Minutos</span>
          <span className="sr-only">Remover</span>
        </div>
        <ol className="space-y-3">
          {rowResults.map(({ row, parsed }, i) => {
            const invalid = !parsed.ok;
            return (
              <li
                key={row.key}
                className="grid grid-cols-[1fr_1fr_2.75rem] gap-2 rounded-xl border border-sand-200 p-2.5 sm:grid-cols-[7.5rem_1fr_1fr_2.75rem] sm:gap-3 sm:border-0 sm:p-0"
              >
                <div className="col-span-3 sm:col-span-1">
                  <label htmlFor={`${uid}-op-${row.key}`} className="sr-only">
                    Operação da linha {i + 1}
                  </label>
                  <select
                    id={`${uid}-op-${row.key}`}
                    value={row.op}
                    onChange={(e) => update(row.key, { op: e.target.value as Operation })}
                    className={`${inputCls} font-semibold`}
                  >
                    <option value="add">+ somar</option>
                    <option value="subtract">− subtrair</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`${uid}-h-${row.key}`} className="mb-1 block text-xs text-stone-muted sm:sr-only">
                    Horas (linha {i + 1})
                  </label>
                  <input
                    id={`${uid}-h-${row.key}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="0"
                    maxLength={6}
                    value={row.hours}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => update(row.key, { hours: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-m-${row.key}`} className="mb-1 block text-xs text-stone-muted sm:sr-only">
                    Minutos (linha {i + 1})
                  </label>
                  <input
                    id={`${uid}-m-${row.key}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="00"
                    maxLength={3}
                    value={row.minutes}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => update(row.key, { minutes: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(row.key)}
                  disabled={rows.length <= 1}
                  aria-label={`Remover linha ${i + 1}`}
                  className="mt-auto inline-flex h-12 w-11 items-center justify-center rounded-lg text-stone-muted hover:bg-danger-soft hover:text-danger disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Trash2 aria-hidden className="h-5 w-5" />
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <button type="button" onClick={addRow} className={btnSecondary} disabled={rows.length >= MAX_ROWS}>
            <Plus aria-hidden className="h-4 w-4" />
            Adicionar linha
          </button>
          <Field
            id={`${uid}-rate`}
            label="Valor por hora (opcional)"
            inputMode="decimal"
            placeholder="0,00"
            suffix="R$"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full sm:w-56"
          />
        </div>

        <ErrorList errors={errors} />

        <button type="submit" className={`${btnPrimary} mt-5 w-full sm:w-auto`}>
          Calcular
        </button>
        <p className="mt-2 text-xs text-stone-muted">O total também é atualizado automaticamente enquanto você digita.</p>

        <div ref={resultRef} tabIndex={-1} className="outline-none">
          <ResultPanel
            mainLabel="Resultado"
            main={hasInput ? formatHM(total) : null}
            lines={lines}
            explanation={explanation}
            copyText={copyText}
            onReset={reset}
          />
        </div>
        <PrivacyNote />
      </form>
    </CalculatorCard>
  );
}
