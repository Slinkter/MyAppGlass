import { describe, it, expect } from "vitest";
import { formatQuoteNumber, limaYear, counterDocId } from "@/features/presupuesto/utils/quoteNumber";

describe("Correlativo de presupuestos", () => {
  it("formatea GYA-AAAA-XXXX con ceros a la izquierda", () => {
    expect(formatQuoteNumber(2026, 1)).toBe("GYA-2026-0001");
    expect(formatQuoteNumber(2026, 842)).toBe("GYA-2026-0842");
    expect(formatQuoteNumber(2026, 12345)).toBe("GYA-2026-12345");
  });

  it("usa el año de Lima (UTC-5), no el UTC", () => {
    expect(limaYear(new Date("2027-01-01T03:00:00Z"))).toBe(2026);
    expect(limaYear(new Date("2027-01-01T05:00:00Z"))).toBe(2027);
  });

  it("deriva el id del contador por año", () => {
    expect(counterDocId(2026)).toBe("presupuesto-2026");
  });
});
