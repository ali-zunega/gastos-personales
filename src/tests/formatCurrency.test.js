import { describe, it, expect } from "vitest";
import { formatCurrency } from "../utils/formatCurrency";

describe("formatCurrency utility", () => {
  it("formats a valid number into currency correctly", () => {
    const result = formatCurrency(15000);
    // Depende de la configuración regional de Node - suele retornar algo como "$ 15.000"
    expect(result).toContain("15.000");
  });

  it("handles invalid numbers gracefully returning $0", () => {
    expect(formatCurrency("abc")).toContain("0");
    expect(formatCurrency(null)).toContain("0");
  });
});
