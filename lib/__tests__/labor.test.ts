import { describe, expect, it } from "vitest";
import {
  hourlyRateFromSalary,
  nightMinutesInShift,
  nightPremium,
  overtimePay,
  reducedNightMinutes,
  timeBankBalance,
  workedMinutes,
} from "../labor";

const hm = (h: number, m: number) => h * 60 + m;

describe("workedMinutes", () => {
  it("08:00–17:00 with 1h break = 8h", () => {
    expect(workedMinutes(hm(8, 0), hm(17, 0), 60)).toEqual({ ok: true, minutes: 480, span: 540 });
  });
  it("22:00–06:00 with 1h break = 7h (crosses midnight)", () => {
    const r = workedMinutes(hm(22, 0), hm(6, 0), 60);
    expect(r.ok && r.minutes).toBe(420);
  });
  it("rejects break longer than shift and equal times", () => {
    expect(workedMinutes(hm(8, 0), hm(9, 0), 60).ok).toBe(false);
    expect(workedMinutes(hm(8, 0), hm(8, 0), 0).ok).toBe(false);
  });
});

describe("overtime", () => {
  it("R$ 2.200 / 220 = R$ 10/h; 2h at 50% = R$ 30", () => {
    const rate = hourlyRateFromSalary(2200, 220);
    expect(rate).toBe(10);
    expect(overtimePay(120, rate, 50)).toEqual({ overtimeRate: 15, total: 30, base: 20, premium: 10 });
  });
  it("100% doubles the hour; custom 75%", () => {
    expect(overtimePay(60, 10, 100).total).toBe(20);
    expect(overtimePay(90, 10, 75).total).toBe(26.25);
  });
  it("divisors 210 and 200", () => {
    expect(hourlyRateFromSalary(4200, 210)).toBe(20);
    expect(hourlyRateFromSalary(4000, 200)).toBe(20);
    expect(hourlyRateFromSalary(1000, 0)).toBe(0);
  });
});

describe("night work", () => {
  const W0 = hm(22, 0);
  const W1 = hm(5, 0);
  it("22:00–05:00 = 7h real = 8h computed (52m30s hour)", () => {
    const real = nightMinutesInShift(hm(22, 0), hm(5, 0), W0, W1);
    expect(real).toBe(420);
    expect(reducedNightMinutes(real)).toBe(480);
  });
  it("18:00–02:00 has 4h of night work", () => {
    expect(nightMinutesInShift(hm(18, 0), hm(2, 0), W0, W1)).toBe(240);
  });
  it("03:00–12:00 has 2h of night work", () => {
    expect(nightMinutesInShift(hm(3, 0), hm(12, 0), W0, W1)).toBe(120);
  });
  it("day shift has none", () => {
    expect(nightMinutesInShift(hm(8, 0), hm(17, 0), W0, W1)).toBe(0);
  });
  it("rural lavoura window 21:00–05:00", () => {
    expect(nightMinutesInShift(hm(20, 0), hm(6, 0), hm(21, 0), hm(5, 0))).toBe(480);
  });
  it("premium: 7h real, reduced hour, R$ 10/h, 20% = 8h × 2 = R$ 16", () => {
    const r = nightPremium({ realNightMinutes: 420, useReducedHour: true, hourlyRate: 10, percent: 20 });
    expect(r.computedMinutes).toBe(480);
    expect(r.premium).toBe(16);
    expect(r.totalWithBase).toBe(96);
  });
  it("premium without reduced hour, 25%", () => {
    expect(nightPremium({ realNightMinutes: 480, useReducedHour: false, hourlyRate: 10, percent: 25 }).premium).toBe(20);
  });
});

describe("time bank", () => {
  it("positive and negative days", () => {
    const r = timeBankBalance([
      { expected: 480, worked: 540 },
      { expected: 480, worked: 450 },
      { expected: 480, worked: 480 },
    ]);
    expect(r).toEqual({ expected: 1440, worked: 1470, balance: 30 });
  });
  it("negative balance", () => {
    expect(timeBankBalance([{ expected: 480, worked: 400 }]).balance).toBe(-80);
  });
});
