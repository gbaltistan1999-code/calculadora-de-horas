/**
 * Pure labor-related calculations (estimates). All percentages and limits are
 * parameters so that collective agreements and special categories can be
 * represented. Legal references: see data/legal-sources.ts.
 */
import { clockDifference, MINUTES_PER_DAY, roundTo } from "./time";

/** Worked minutes in a day: (exit − entry) − break. Crosses midnight if exit <= entry. */
export function workedMinutes(
  entry: number,
  exit: number,
  breakMinutes: number,
): { ok: true; minutes: number; span: number } | { ok: false; error: string } {
  const span = clockDifference(entry, exit);
  if (span === 0) return { ok: false, error: "Entrada e saída não podem ser iguais." };
  if (breakMinutes < 0) return { ok: false, error: "O intervalo não pode ser negativo." };
  if (breakMinutes >= span) {
    return { ok: false, error: "O intervalo é maior ou igual ao período entre entrada e saída." };
  }
  return { ok: true, minutes: span - breakMinutes, span };
}

/** Hourly rate from monthly salary and monthly divisor (e.g. 220, 210, 200). */
export function hourlyRateFromSalary(monthlySalary: number, divisor: number): number {
  if (divisor <= 0) return 0;
  return monthlySalary / divisor;
}

/** Overtime pay for `minutes` at `hourlyRate` with an additional `percent` (50 = +50%). */
export function overtimePay(minutes: number, hourlyRate: number, percent: number) {
  const overtimeRate = hourlyRate * (1 + percent / 100);
  const total = roundTo((minutes / 60) * overtimeRate, 2);
  const base = roundTo((minutes / 60) * hourlyRate, 2);
  return { overtimeRate: roundTo(overtimeRate, 2), total, base, premium: roundTo(total - base, 2) };
}

/** Overlap (in minutes) between two half-open intervals. */
function overlap(a0: number, a1: number, b0: number, b1: number): number {
  return Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
}

/**
 * Real (clock) minutes worked inside the night window.
 * start/end are clock times; end <= start means the shift crosses midnight.
 * windowStart/windowEnd: e.g. 22:00 (1320) and 05:00 (300).
 */
export function nightMinutesInShift(start: number, end: number, windowStart: number, windowEnd: number): number {
  const shiftLen = clockDifference(start, end, true);
  const s0 = start;
  const s1 = start + shiftLen;
  const winLen = clockDifference(windowStart, windowEnd, true);
  let total = 0;
  for (let day = -1; day <= 2; day++) {
    const w0 = windowStart + day * MINUTES_PER_DAY;
    total += overlap(s0, s1, w0, w0 + winLen);
  }
  return total;
}

/** Night hour of 52m30s: real minutes -> "computed" minutes (× 60 / 52.5 = × 8/7). */
export function reducedNightMinutes(realMinutes: number): number {
  return (realMinutes * 8) / 7;
}

export function nightPremium(params: {
  realNightMinutes: number;
  useReducedHour: boolean;
  hourlyRate: number;
  percent: number;
}) {
  const computedMinutes = params.useReducedHour
    ? reducedNightMinutes(params.realNightMinutes)
    : params.realNightMinutes;
  const hours = computedMinutes / 60;
  const premium = roundTo(hours * params.hourlyRate * (params.percent / 100), 2);
  const totalWithBase = roundTo(hours * params.hourlyRate * (1 + params.percent / 100), 2);
  return { computedMinutes, premium, totalWithBase };
}

/** Time bank: sum of (worked − expected). Positive = credit, negative = debt. */
export function timeBankBalance(days: { expected: number; worked: number }[]) {
  let expected = 0;
  let worked = 0;
  for (const d of days) {
    expected += d.expected;
    worked += d.worked;
  }
  return { expected, worked, balance: worked - expected };
}
