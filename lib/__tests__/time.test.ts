import { describe, expect, it } from "vitest";
import {
  clockDifference,
  decimalHoursToMinutes,
  hoursMinutesToMinutes,
  parseClockTime,
  parseDecimal,
  parseDurationText,
  parseIntegerField,
  sumDurations,
} from "../time";
import { formatBRL, formatClock, formatDecimal, formatHM, formatHMWords, moneyForMinutes } from "../format";

const hm = (h: number, m: number) => h * 60 + m;

describe("sumDurations (base 60)", () => {
  it("7h20 + 1h50 = 9h10", () => {
    const t = sumDurations([
      { op: "add", minutes: hm(7, 20) },
      { op: "add", minutes: hm(1, 50) },
    ]);
    expect(t).toBe(550);
    expect(formatHM(t)).toBe("9h10");
    expect(formatDecimal(t / 60)).toBe("9,17");
  });
  it("8h00 − 1h15 = 6h45", () => {
    expect(formatHM(sumDurations([{ op: "add", minutes: hm(8, 0) }, { op: "subtract", minutes: hm(1, 15) }]))).toBe("6h45");
  });
  it("1h00 − 2h15 = −1h15", () => {
    const t = sumDurations([{ op: "add", minutes: 60 }, { op: "subtract", minutes: hm(2, 15) }]);
    expect(t).toBe(-75);
    expect(formatHM(t)).toBe("−1h15");
    expect(formatClock(t)).toBe("−01:15");
    expect(formatHMWords(t)).toBe("menos 1 hora e 15 minutos");
  });
  it("30 min + 45 min = 1h15", () => {
    expect(formatHM(sumDurations([{ op: "add", minutes: 30 }, { op: "add", minutes: 45 }]))).toBe("1h15");
  });
  it("totals above 24h are kept as durations", () => {
    const t = sumDurations([
      { op: "add", minutes: hm(20, 0) },
      { op: "add", minutes: hm(10, 30) },
    ]);
    expect(formatHM(t)).toBe("30h30");
    expect(formatClock(t)).toBe("30:30");
  });
  it("empty list = 0", () => {
    expect(sumDurations([])).toBe(0);
    expect(formatHMWords(0)).toBe("0 minutos");
  });
});

describe("decimal conversion", () => {
  it("7h30 = 7,5", () => expect(formatDecimal(hm(7, 30) / 60)).toBe("7,5"));
  it("7h20 ≈ 7,33", () => expect(formatDecimal(hm(7, 20) / 60)).toBe("7,33"));
  it("7,5 -> 450 min; 7,33 -> 440 min; 0,1 -> 6 min", () => {
    expect(decimalHoursToMinutes(7.5)).toBe(450);
    expect(decimalHoursToMinutes(7.33)).toBe(440);
    expect(decimalHoursToMinutes(0.1)).toBe(6);
  });
});

describe("clockDifference", () => {
  it("22:00 to 06:00 across midnight = 8h00", () => {
    expect(formatHM(clockDifference(hm(22, 0), hm(6, 0)))).toBe("8h00");
  });
  it("08:00 to 17:30 = 9h30", () => expect(clockDifference(hm(8, 0), hm(17, 30))).toBe(570));
  it("equal times = 0 or 24h", () => {
    expect(clockDifference(600, 600)).toBe(0);
    expect(clockDifference(600, 600, true)).toBe(1440);
  });
});

describe("parsing and validation", () => {
  it("hours/minutes fields", () => {
    expect(hoursMinutesToMinutes("7", "20")).toEqual({ ok: true, minutes: 440 });
    expect(hoursMinutesToMinutes("", "")).toEqual({ ok: true, minutes: 0 });
    expect(hoursMinutesToMinutes("1", "60").ok).toBe(false);
    expect(hoursMinutesToMinutes("abc", "0").ok).toBe(false);
    expect(hoursMinutesToMinutes("-2", "0").ok).toBe(false);
    expect(hoursMinutesToMinutes("1,5", "0").ok).toBe(false);
    expect(parseIntegerField("99999999", "Horas").ok).toBe(false);
  });
  it("clock times", () => {
    expect(parseClockTime("08:30")).toEqual({ ok: true, minutes: 510 });
    expect(parseClockTime("8h30")).toEqual({ ok: true, minutes: 510 });
    expect(parseClockTime("830")).toEqual({ ok: true, minutes: 510 });
    expect(parseClockTime("17")).toEqual({ ok: true, minutes: 1020 });
    expect(parseClockTime("24:00").ok).toBe(false);
    expect(parseClockTime("10:75").ok).toBe(false);
    expect(parseClockTime("").ok).toBe(false);
  });
  it("duration text", () => {
    expect(parseDurationText("7:30")).toEqual({ ok: true, minutes: 450 });
    expect(parseDurationText("7h30")).toEqual({ ok: true, minutes: 450 });
    expect(parseDurationText("45min")).toEqual({ ok: true, minutes: 45 });
    expect(parseDurationText("30h")).toEqual({ ok: true, minutes: 1800 });
    expect(parseDurationText("7:75").ok).toBe(false);
  });
  it("decimal numbers in pt-BR", () => {
    expect(parseDecimal("7,5")).toEqual({ ok: true, value: 7.5 });
    expect(parseDecimal("1.234,56")).toEqual({ ok: true, value: 1234.56 });
    expect(parseDecimal("R$ 25,00")).toEqual({ ok: true, value: 25 });
    expect(parseDecimal("-3").ok).toBe(false);
    expect(parseDecimal("abc").ok).toBe(false);
  });
});

describe("money", () => {
  it("9h10 at R$ 25,00 = R$ 229,17", () => {
    expect(formatBRL(moneyForMinutes(550, 25))).toBe("R$ 229,17");
  });
  it("thousands separator", () => expect(formatBRL(1234.56)).toBe("R$ 1.234,56"));
  it("rounds half up", () => expect(formatBRL(0.125)).toBe("R$ 0,13"));
});
