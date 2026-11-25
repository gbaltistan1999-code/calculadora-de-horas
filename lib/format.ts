import { roundTo, splitMinutes } from "./time";

const MINUS = "−"; // U+2212, typographic minus

/** 550 -> "9h10"; -75 -> "−1h15"; 45 -> "0h45". */
export function formatHM(total: number): string {
  const { negative, hours, minutes } = splitMinutes(total);
  return `${negative ? MINUS : ""}${hours}h${String(minutes).padStart(2, "0")}`;
}

/** 550 -> "09:10"; 1530 -> "25:30"; -75 -> "−01:15". */
export function formatClock(total: number): string {
  const { negative, hours, minutes } = splitMinutes(total);
  return `${negative ? MINUS : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** Clock time of day (wraps at 24h). */
export function formatTimeOfDay(minutesOfDay: number): string {
  const m = ((minutesOfDay % 1440) + 1440) % 1440;
  return formatClock(m);
}

/** 550 -> "9 horas e 10 minutos". */
export function formatHMWords(total: number): string {
  const { negative, hours, minutes } = splitMinutes(total);
  const parts: string[] = [];
  if (hours > 0) parts.push(`${formatInteger(hours)} ${hours === 1 ? "hora" : "horas"}`);
  if (minutes > 0 || hours === 0) parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
  return `${negative ? "menos " : ""}${parts.join(" e ")}`;
}

/** pt-BR number with fixed max decimals: 9.1666 -> "9,17"; 7.5 -> "7,5". */
export function formatDecimal(value: number, maxDecimals = 2, minDecimals = 0): string {
  const rounded = roundTo(value, maxDecimals);
  const s = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(Math.abs(rounded));
  return rounded < 0 ? `${MINUS}${s}` : s;
}

export function formatInteger(value: number): string {
  const s = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(Math.abs(value));
  return value < 0 ? `${MINUS}${s}` : s;
}

/** Brazilian reais, rounded to centavos: 1234.565 -> "R$ 1.234,57". */
export function formatBRL(value: number): string {
  const rounded = roundTo(value, 2);
  const s = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    Math.abs(rounded),
  );
  return `${rounded < 0 ? MINUS : ""}R$ ${s}`;
}

/** Money from minutes × hourly rate, computed in centavos to avoid float drift. */
export function moneyForMinutes(minutes: number, hourlyRate: number): number {
  return roundTo((minutes * hourlyRate) / 60, 2);
}
