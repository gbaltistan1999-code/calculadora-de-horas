"use client";

import { useId, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatClock, formatDecimal, formatHM, formatHMWords } from "@/lib/format";
import { timeBankBalance } from "@/lib/labor";
import { parseDurationText } from "@/lib/time";
import { btnSecondary, CalculatorCard, ErrorList, Field, inputCls, PrivacyNote, ResultPanel, Segmented } from "./ui";

type Row = { key: number; label: string; expected: string; worked: string };

const makeRows = (std: string): Row[] =>
  [1, 2, 3, 4, 5].map((k) => ({ key: k, label: `Dia ${k}`, expected: std, worked: "" }));

/**
 * Behavior: a row with "trabalhado" empty is ignored (not counted as a debt).
 * "Previsto" may be 0:00 (e.g. a day off on which overtime was worked).
 */
export function TimeBankCalculator() {
  const uid = useId();
  const [std, setStd] = useState("8:00");
  const [rows, setRows] = useState<Row[]>(() => makeRows("8:00"));
  const [prevSign, setPrevSign] = useState<"pos" | "neg">("pos");
  const [prev, setPrev] = useState("");
  const nextKey = useRef(6);

  const errors: string[] = [];
  const days: { expected: number; worked: number; key: number }[] = [];
  const diffs = new Map<number, number>();
  rows.forEach((r) => {
    if (r.worked.trim() === "") return;
    const e = parseDurationText(r.expected.trim() === "" ? "0" : r.expected);
    const w = parseDurationText(r.worked);
    if (!e.ok) return void errors.push(`${r.label} — Previsto: ${e.error}`);
    if (!w.ok) return void errors.push(`${r.label} — Trabalhado: ${w.error}`);
    days.push({ expected: e.minutes, worked: w.minutes, key: r.key });
    diffs.set(r.key, w.minutes - e.minutes);
  });
  let prevMin = 0;
  if (prev.trim()) {
    const p = parseDurationText(prev);
    if (p.ok) prevMin = prevSign === "pos" ? p.minutes : -p.minutes;
    else errors.push(`Saldo anterior: ${p.error}`);
  }
  const res = timeBankBalance(days);
  const balance = res.balance + prevMin;
  const has = days.length > 0 || prevMin !== 0;

  function update(key: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }
  function addRow() {
    const key = nextKey.current++;
    setRows((rs) => [...rs, { key, label: `Dia ${rs.length + 1}`, expected: std, worked: "" }]);
  }
  function reset() {
    setRows(makeRows(std));
    setPrev("");
    nextKey.current = 6;
  }

  return (
    <CalculatorCard title="Calculadora de banco de horas">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-std`} label="Jornada prevista padrão" placeholder="8:00" hint="Usada nas novas linhas. Ex.: 8:00, 8:48, 6:00"
          value={std} onChange={(e) => setStd(e.target.value)} />
        <div>
          <Field id={`${uid}-prev`} label="Saldo anterior (opcional)" placeholder="0:00" value={prev}
            onChange={(e) => setPrev(e.target.value)} />
          <div className="mt-2">
            <Segmented name={`${uid}-sign`} legend="O saldo anterior é" value={prevSign} onChange={setPrevSign}
              options={[{ value: "pos", label: "Positivo (crédito)" }, { value: "neg", label: "Negativo (débito)" }]} />
          </div>
        </div>
      </div>

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-separate border-spacing-y-2 text-sm">
          <caption className="sr-only">Horas previstas e trabalhadas por dia</caption>
          <thead>
            <tr className="text-left text-stone-muted">
              <th scope="col" className="pr-2 font-medium">Dia</th>
              <th scope="col" className="px-1 font-medium">Previsto</th>
              <th scope="col" className="px-1 font-medium">Trabalhado</th>
              <th scope="col" className="px-1 text-right font-medium">Saldo do dia</th>
              <th scope="col"><span className="sr-only">Remover</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const d = diffs.get(r.key);
              return (
                <tr key={r.key}>
                  <td className="pr-2">
                    <input aria-label="Nome do dia" className={`${inputCls} w-28`} value={r.label}
                      onChange={(e) => update(r.key, { label: e.target.value })} />
                  </td>
                  <td className="px-1">
                    <input aria-label={`Previsto — ${r.label}`} className={inputCls} placeholder="8:00" value={r.expected}
                      onChange={(e) => update(r.key, { expected: e.target.value })} />
                  </td>
                  <td className="px-1">
                    <input aria-label={`Trabalhado — ${r.label}`} className={inputCls} placeholder="8:30" value={r.worked}
                      onChange={(e) => update(r.key, { worked: e.target.value })} />
                  </td>
                  <td className={`px-1 text-right font-semibold tabular-nums ${d === undefined ? "text-stone-muted" : d < 0 ? "text-danger" : "text-accent"}`}>
                    {d === undefined ? "—" : `${d > 0 ? "+" : ""}${formatHM(d)}`}
                  </td>
                  <td className="pl-1">
                    <button type="button" aria-label={`Remover ${r.label}`} disabled={rows.length <= 1}
                      onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))}
                      className="inline-flex h-12 w-10 items-center justify-center rounded-lg text-stone-muted hover:bg-danger-soft hover:text-danger disabled:opacity-30">
                      <Trash2 aria-hidden className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <button type="button" className={btnSecondary} onClick={addRow}>
          <Plus aria-hidden className="h-4 w-4" /> Adicionar dia
        </button>
        <p className="text-xs text-stone-muted">Linhas sem horas trabalhadas são ignoradas.</p>
      </div>

      <ErrorList errors={errors} />
      <ResultPanel
        mainLabel={balance < 0 ? "Saldo negativo (você deve horas)" : "Saldo do banco de horas"}
        main={has ? `${balance > 0 ? "+" : ""}${formatHM(balance)}` : null}
        lines={
          has
            ? [
                { label: "Total previsto", value: formatClock(res.expected) },
                { label: "Total trabalhado", value: formatClock(res.worked) },
                { label: "Saldo dos dias", value: `${res.balance > 0 ? "+" : ""}${formatHM(res.balance)}` },
                { label: "Saldo em decimal", value: `${formatDecimal(balance / 60)} h` },
              ]
            : []
        }
        explanation={
          has ? (
            <p>
              {balance === 0
                ? "Saldo zerado: as horas trabalhadas equivalem às previstas."
                : balance > 0
                  ? `Você tem ${formatHMWords(balance)} de crédito para compensar.`
                  : `Faltam ${formatHMWords(-balance)} para cumprir a jornada prevista.`}
            </p>
          ) : (
            <p>Preencha as horas trabalhadas de pelo menos um dia.</p>
          )
        }
        copyText={has ? `Saldo do banco de horas: ${balance > 0 ? "+" : ""}${formatHM(balance)}` : ""}
        onReset={reset}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}
