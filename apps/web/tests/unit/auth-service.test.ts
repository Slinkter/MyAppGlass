import { describe, it, expect } from "vitest";
import { isValidDniRuc } from "@/features/auth/services/auth-service";

describe("auth-service", () => {
  it("isValidDniRuc acepta 8 u 11 dígitos", () => {
    expect(isValidDniRuc("12345678")).toBe(true);
    expect(isValidDniRuc("20123456789")).toBe(true);
    expect(isValidDniRuc("123456789")).toBe(false);
    expect(isValidDniRuc("1234567a")).toBe(false);
  });
});
