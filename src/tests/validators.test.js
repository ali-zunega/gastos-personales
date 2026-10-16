import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidAmount,
  validateExpenseForm,
} from "../utils/validators";

describe("Validators utility", () => {
  it("validates email addresses correctly", () => {
    expect(isValidEmail("test@valoora.com")).toBe(true);
    expect(isValidEmail("correo-invalido")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  it("validates positive expense amounts", () => {
    expect(isValidAmount(500)).toBe(true);
    expect(isValidAmount("150.50")).toBe(true);
    expect(isValidAmount(0)).toBe(false);
    expect(isValidAmount(-50)).toBe(false);
    expect(isValidAmount("texto")).toBe(false);
  });

  it("detects errors in incomplete expense forms", () => {
    const invalidForm = validateExpenseForm({
      amount: "",
      category: "",
      date: "",
    });
    expect(invalidForm.isValid).toBe(false);
    expect(invalidForm.errors.amount).toBeDefined();
    expect(invalidForm.errors.category).toBeDefined();
    expect(invalidForm.errors.date).toBeDefined();
  });
});
