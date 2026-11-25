/**
 * Pure time arithmetic. Every duration is an integer number of minutes
 * (base 60). Decimal hours are only produced for display, never used for
 * intermediate arithmetic.
 */

export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 24 * 60;

export type ParseResult =
  | { ok: true; minutes: number }
  | { ok: false; error: string };

/** Parse a non-negative integer field. Empty string = 0 (documented behavior). */
export function parseIntegerField(raw: string, fieldName: string): ParseResult {
  const value = raw.trim();
  if (value === "") return { ok: true, minutes: 0 };
  if (!/^\d+$/.test(value)) {
    if (/^-/.test(value)) {
      return { ok: false, error: `${fieldName}: use apenas números positivos. Para subtrair, escolha a operação “−”.` };
    }
    return { ok: false, error: `${fieldName}: digite apenas números inteiros.` };
  }
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n > 1_000_000) {
    return { ok: false, error: `${fieldName}: valor muito grande.` };
  }
  return { ok: true, minutes: n };
}

/**
 * Hours + minutes fields -> total minutes.
 * Minutes must be 0–59 (documented behavior: larger values are rejected so the
 * user notices a possible typo instead of silently normalizing).
 */
export function hoursMinutesToMinutes(hoursRaw: string, minutesRaw: string): ParseResult {
  const h = parseIntegerField(hoursRaw, "Horas");
  if (!h.ok) return h;
  const m = parseIntegerField(minutesRaw, "Minutos");
  if (!m.ok) return m;
  if (m.minutes > 59) {
    return { ok: false, error: "Minutos: use um valor de 0 a 59 (60 minutos = 1 hora)." };
  }
  return { ok: true, minutes: h.minutes * MINUTES_PER_HOUR + m.minutes };
}

/**
 * Parse a clock time "HH:MM" (00:00–23:59). Also accepts "8", "830", "8h30",
 * "8:30", "08h". Empty -> error (clock times are required where used).
 */
export function parseClockTime(raw: string): ParseResult {
  const value = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (value === "") return { ok: false, error: "Informe um horário." };
  let h: number;
  let m: number;
  let match = value.match(/^(\d{1,2})(?::|h)(\d{1,2})?$/);
  if (match) {
    h = Number(match[1]);
    m = match[2] ? Number(match[2]) : 0;
    if (match[2] && match[2].length !== 2) return { ok: false, error: "Use o formato HH:MM, por exemplo 08:30." };
  } else if ((match = value.match(/^(\d{1,4})$/))) {
    const digits = match[1];
    if (digits.length <= 2) {
      h = Number(digits);
      m = 0;
    } else {
      h = Number(digits.slice(0, -2));
      m = Number(digits.slice(-2));
    }
  } else {
    return { ok: false, error: "Use o formato HH:MM, por exemplo 08:30." };
  }
  if (h > 23) return { ok: false, error: "A hora deve ficar entre 00 e 23." };
  if (m > 59) return { ok: false, error: "Os minutos devem ficar entre 00 e 59." };
  return { ok: true, minutes: h * MINUTES_PER_HOUR + m };
}

/**
 * Parse a duration typed as text: "7:30", "7h30", "7h", "45min", "7".
 * Hours may exceed 24. Used by converters.
 */
export function parseDurationText(raw: string): ParseResult {
  const value = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (value === "") return { ok: false, error: "Informe uma duração." };
  let match = value.match(/^(\d{1,6})(?::|h)(\d{1,2})?(?:min|m)?$/);
  if (match) {
    const h = Number(match[1]);
    const m = match[2] ? Number(match[2]) : 0;
    if (m > 59) return { ok: false, error: "Os minutos devem ficar entre 0 e 59." };
    return { ok: true, minutes: h * 60 + m };
  }
  if ((match = value.match(/^(\d{1,7})(?:min|m)$/))) {
    return { ok: true, minutes: Number(match[1]) };
  }
  if ((match = value.match(/^(\d{1,6})$/))) {
    return { ok: true, minutes: Number(match[1]) * 60 };
  }
  return { ok: false, error: "Use o formato h:mm, por exemplo 7:30 ou 7h30." };
}

/** Parse a decimal number in pt-BR ("7,5") or with a dot ("7.5"). */
export function parseDecimal(raw: string, fieldName = "Valor"): { ok: true; value: number } | { ok: false; error: string } {
  let value = raw.trim().replace(/\s|R\$/g, "");
  if (value === "") return { ok: false, error: `${fieldName}: campo vazio.` };
  // "1.234,56" -> "1234.56"; "7,5" -> "7.5"; "7.5" stays.
  if (value.includes(",")) value = value.replace(/\./g, "").replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(value)) {
    return { ok: false, error: `${fieldName}: digite um número positivo, por exemplo 7,5.` };
  }
  const n = Number(value);
  if (!Number.isFinite(n)) return { ok: false, error: `${fieldName}: número inválido.` };
  return { ok: true, value: n };
}

export type Operation = "add" | "subtract";
export type DurationEntry = { op: Operation; minutes: number };

/** Sum a list of signed durations. Result may be negative or above 24h. */
export function sumDurations(entries: DurationEntry[]): number {
  return entries.reduce((acc, e) => (e.op === "add" ? acc + e.minutes : acc - e.minutes), 0);
}

/**
 * Minutes between two clock times. If end <= start, the period is assumed to
 * cross midnight (22:00 -> 06:00 = 8h). Equal times = 0 unless allowFullDay.
 */
export function clockDifference(startMin: number, endMin: number, equalMeansFullDay = false): number {
  if (endMin === startMin) return equalMeansFullDay ? MINUTES_PER_DAY : 0;
  return endMin > startMin ? endMin - startMin : MINUTES_PER_DAY - startMin + endMin;
}

/** Split total minutes into sign, hours, minutes. */
export function splitMinutes(total: number): { negative: boolean; hours: number; minutes: number } {
  const negative = total < 0;
  const abs = Math.abs(total);
  return { negative, hours: Math.floor(abs / 60), minutes: abs % 60 };
}

/** Round half away from zero to `decimals` places, robust to float noise. */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  const sign = value < 0 ? -1 : 1;
  return (sign * Math.round(Math.abs(value) * factor + 1e-9)) / factor;
}

/** Minutes -> decimal hours number (for display or money). */
export function minutesToDecimalHours(total: number): number {
  return total / 60;
}

/** Decimal hours -> nearest whole minute. 7.5 -> 450, 7.33 -> 440. */
export function decimalHoursToMinutes(hours: number): number {
  return Math.round(hours * 60 + (hours >= 0 ? 1e-9 : -1e-9));
}
