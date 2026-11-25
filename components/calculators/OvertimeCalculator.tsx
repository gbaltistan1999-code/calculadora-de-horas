"use client";

import { useId, useState } from "react";
import { formatBRL, formatDecimal, formatHM } from "@/lib/format";
import { hourlyRateFromSalary, overtimePay } from "@/lib/labor";
import { hoursMinutesToMinutes, parseDecimal } from "@/lib/time";
import { CalculatorCard, ErrorList, Field, PrivacyNote, ResultPanel, Segmented } from "./ui";

type Source = "salary" | "hourly";
type Divisor = "220" | "210" | "200" | "custom";
type Pct = "50" | "100" | "custom";

export function OvertimeCalculator() {
  const uid = useId();
  const [source, setSource] = useState<Source>("salary");
  const [salary, setSalary] = useState("");
  const [divisor, setDivisor] = useState<Divisor>("220");
  const [customDivisor, setCustomDivisor] = useState("");
  const [hourly, setHourly] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [pct, setPct] = useState<Pct>("50");
  const [customPct, setCustomPct] = useState("");

  const errors: string[] = [];

  // Hourly rate
  let rate: number | null = null;
  if (source === "salary") {
    const s = salary.trim() ? parseDecimal(salary, "Salário") : null;
    const dRaw = divisor === "custom" ? customDivisor : divisor;
    const d = dRaw.trim() ? parseDecimal(dRaw, "Divisor") : null;
    if (s && !s.ok) errors.push(s.error);
    if (d && !d.ok) errors.push(d.error);
    if (d && d.ok && d.value === 0) errors.push("Divisor: deve ser maior que zero.");
    if (s?.ok && d?.ok && d.value > 0) rate = hourlyRateFromSalary(s.value, d.value);
  } else if (hourly.trim()) {
    const h = parseDecimal(hourly, "Valor da hora");
    if (h.ok) rate = h.value;
    else errors.push(h.error);
  }

  // Overtime duration
  const dur = hoursMinutesToMinutes(hours, minutes);
  if (!dur.ok) errors.push(dur.error);
  const otMinutes = dur.ok ? dur.minutes : 0;

  // Percentage
  let percent: number | null = pct === "custom" ? null : Number(pct);
  if (pct === "custom" && customPct.trim()) {
    const p = parseDecimal(customPct, "Percentual");
    if (p.ok) percent = p.value;
    else errors.push(p.error);
  }

  const ready = rate !== null && percent !== null && otMinutes > 0 && errors.length === 0;
  const r = ready ? overtimePay(otMinutes, rate!, percent!) : null;

  function reset() {
    setSalary("");
    setHourly("");
    setHours("");
    setMinutes("");
    setCustomDivisor("");
    setCustomPct("");
    setDivisor("220");
    setPct("50");
  }

  return (
    <CalculatorCard title="Calculadora de horas extras">
      <div className="space-y-5">
        <Segmented
          name={`${uid}-source`}
          legend="Como você quer informar a remuneração?"
          value={source}
          onChange={setSource}
          options={[
            { value: "salary", label: "Salário mensal" },
            { value: "hourly", label: "Valor da hora" },
          ]}
        />

        {source === "salary" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id={`${uid}-sal`} label="Salário mensal (bruto)" inputMode="decimal" placeholder="2.500,00" suffix="R$"
              value={salary} onChange={(e) => setSalary(e.target.value)} />
            <div>
              <Segmented
                name={`${uid}-div`}
                legend="Divisor mensal de horas"
                value={divisor}
                onChange={setDivisor}
                options={[
                  { value: "220", label: "220 (44h/sem.)" },
                  { value: "210", label: "210 (42h/sem.)" },
                  { value: "200", label: "200 (40h/sem.)" },
                  { value: "custom", label: "Outro" },
                ]}
              />
              {divisor === "custom" && (
                <Field id={`${uid}-cdiv`} label="Divisor personalizado" inputMode="decimal" placeholder="180"
                  value={customDivisor} onChange={(e) => setCustomDivisor(e.target.value)} className="mt-3" />
              )}
            </div>
          </div>
        ) : (
          <Field id={`${uid}-hr`} label="Valor da hora normal" inputMode="decimal" placeholder="15,00" suffix="R$"
            value={hourly} onChange={(e) => setHourly(e.target.value)} className="sm:w-1/2" />
        )}

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-charcoal-soft">Horas extras realizadas</legend>
          <div className="grid grid-cols-2 gap-3 sm:w-1/2">
            <Field id={`${uid}-h`} label="Horas" inputMode="numeric" placeholder="0" value={hours}
              onChange={(e) => setHours(e.target.value)} />
            <Field id={`${uid}-m`} label="Minutos" inputMode="numeric" placeholder="00" value={minutes}
              onChange={(e) => setMinutes(e.target.value)} />
          </div>
        </fieldset>

        <div>
          <Segmented
            name={`${uid}-pct`}
            legend="Adicional de hora extra"
            value={pct}
            onChange={setPct}
            options={[
              { value: "50", label: "50%" },
              { value: "100", label: "100%" },
              { value: "custom", label: "Outro" },
            ]}
          />
          {pct === "custom" && (
            <Field id={`${uid}-cpct`} label="Percentual personalizado" inputMode="decimal" placeholder="70" suffix="%"
              value={customPct} onChange={(e) => setCustomPct(e.target.value)} className="mt-3 sm:w-1/2"
              hint="Use o percentual da sua convenção ou acordo coletivo, se houver." />
          )}
        </div>
      </div>

      <ErrorList errors={errors} />
      <ResultPanel
        mainLabel="Valor estimado das horas extras"
        main={r ? formatBRL(r.total) : null}
        lines={
          r && rate !== null
            ? [
                { label: "Hora normal", value: formatBRL(rate) },
                { label: `Hora extra (+${formatDecimal(percent!)}%)`, value: formatBRL(r.overtimeRate) },
                { label: "Horas extras", value: `${formatHM(otMinutes)} (${formatDecimal(otMinutes / 60)} h)` },
                { label: "Só o adicional", value: formatBRL(r.premium) },
              ]
            : []
        }
        explanation={
          r && rate !== null ? (
            <p>
              {source === "salary" && <>Hora normal = salário ÷ divisor = {formatBRL(rate)}. </>}
              Hora extra = {formatBRL(rate)} × {formatDecimal(1 + percent! / 100, 2)} ={" "}
              {formatBRL(rate * (1 + percent! / 100))}. Total = {formatDecimal(otMinutes / 60, 4)} h × hora extra ={" "}
              <strong>{formatBRL(r.total)}</strong>. Estimativa sem reflexos (DSR, férias, 13º, FGTS) e sem descontos.
            </p>
          ) : (
            <p>Informe a remuneração e a quantidade de horas extras.</p>
          )
        }
        copyText={r ? `Horas extras: ${formatHM(otMinutes)} a +${formatDecimal(percent!)}% = ${formatBRL(r.total)}` : ""}
        onReset={reset}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}
