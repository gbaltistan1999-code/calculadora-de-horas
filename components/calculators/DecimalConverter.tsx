"use client";

import { useId, useState } from "react";
import { formatClock, formatDecimal, formatHM, formatHMWords, formatInteger } from "@/lib/format";
import { decimalHoursToMinutes, parseDecimal, parseDurationText } from "@/lib/time";
import { CalculatorCard, ErrorList, Field, PrivacyNote, ResultPanel, Segmented } from "./ui";

type Mode = "toDecimal" | "toClock";

export function DecimalConverter() {
  const uid = useId();
  const [mode, setMode] = useState<Mode>("toDecimal");
  const [hm, setHm] = useState("7:30");
  const [dec, setDec] = useState("7,5");

  if (mode === "toDecimal") {
    const r = hm.trim() ? parseDurationText(hm) : null;
    const minutes = r && r.ok ? r.minutes : null;
    return (
      <CalculatorCard title="Converter horas em decimal">
        <ModeSwitch mode={mode} setMode={setMode} uid={uid} />
        <Field id={`${uid}-hm`} label="Horas e minutos" placeholder="7:30" hint="Ex.: 7:30, 7h30, 45min ou 30h15"
          value={hm} onChange={(e) => setHm(e.target.value)} className="mt-5 sm:w-1/2" />
        <ErrorList errors={r && !r.ok ? [r.error] : []} />
        <ResultPanel
          mainLabel="Em horas decimais"
          main={minutes !== null ? `${formatDecimal(minutes / 60)} h` : null}
          lines={
            minutes !== null
              ? [
                  { label: "Com 4 casas", value: formatDecimal(minutes / 60, 4, 4) },
                  { label: "Total em minutos", value: `${formatInteger(minutes)} min` },
                ]
              : []
          }
          explanation={
            minutes !== null ? (
              <p>
                {formatHM(minutes)}: {Math.floor(minutes / 60)} h + {minutes % 60} ÷ 60 ={" "}
                <strong>{formatDecimal(minutes / 60, 4)}</strong>. Valor exibido arredondado a 2 casas.
              </p>
            ) : (
              <p>Digite uma duração.</p>
            )
          }
          copyText={minutes !== null ? `${formatHM(minutes)} = ${formatDecimal(minutes / 60)} h` : ""}
          onReset={() => setHm("")}
        />
        <PrivacyNote />
      </CalculatorCard>
    );
  }

  const r = dec.trim() ? parseDecimal(dec, "Horas decimais") : null;
  const minutes = r && r.ok ? decimalHoursToMinutes(r.value) : null;
  return (
    <CalculatorCard title="Converter decimal em horas e minutos">
      <ModeSwitch mode={mode} setMode={setMode} uid={uid} />
      <Field id={`${uid}-dec`} label="Horas decimais" inputMode="decimal" placeholder="7,5" hint="Use vírgula ou ponto: 7,5 ou 7.5"
        value={dec} onChange={(e) => setDec(e.target.value)} className="mt-5 sm:w-1/2" />
      <ErrorList errors={r && !r.ok ? [r.error] : []} />
      <ResultPanel
        mainLabel="Em horas e minutos"
        main={minutes !== null ? formatHM(minutes) : null}
        lines={
          minutes !== null
            ? [
                { label: "Formato hh:mm", value: formatClock(minutes) },
                { label: "Total em minutos", value: `${formatInteger(minutes)} min` },
              ]
            : []
        }
        explanation={
          minutes !== null && r && r.ok ? (
            <p>
              Parte decimal × 60 = minutos ({formatDecimal(r.value % 1, 4)} × 60 ≈ {minutes % 60}). Resultado:{" "}
              <strong>{formatHMWords(minutes)}</strong> (arredondado ao minuto mais próximo).
            </p>
          ) : (
            <p>Digite um número de horas decimais.</p>
          )
        }
        copyText={minutes !== null && r?.ok ? `${formatDecimal(r.value, 4)} h = ${formatHM(minutes)}` : ""}
        onReset={() => setDec("")}
      />
      <PrivacyNote />
    </CalculatorCard>
  );
}

function ModeSwitch({ mode, setMode, uid }: { mode: Mode; setMode: (m: Mode) => void; uid: string }) {
  return (
    <Segmented
      name={`${uid}-mode`}
      legend="Direção da conversão"
      value={mode}
      onChange={setMode}
      options={[
        { value: "toDecimal", label: "hh:mm → decimal" },
        { value: "toClock", label: "decimal → hh:mm" },
      ]}
    />
  );
}
