import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ExpensesProvider } from "../context/ExpensesContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useExpenses } from "../hooks/useExpenses.js";

beforeEach(() => localStorage.clear());

// Un solo árbol: AuthProvider > ExpensesProvider, ambos hooks suscriptos
// al mismo. (Dos renderHook separados crean dos árboles independientes
// y el login de uno no se refleja en el otro.)
const wrapper = ({ children }) => (
  <AuthProvider>
    <ExpensesProvider>{children}</ExpensesProvider>
  </AuthProvider>
);

const renderApp = () =>
  renderHook(() => ({ auth: useAuth(), exp: useExpenses() }), { wrapper });

describe("providers smoke", () => {
  it("register + addExpense + filtros + persistencia tras relogin", () => {
    const { result } = renderApp();
    const state = () => result.current;

    act(() => {
      expect(
        state().auth.register({
          name: "Test",
          email: "Test@Valoora.com",
          password: "1234",
        }),
      ).toBe(true);
    });
    // email normalizado a minúsculas
    expect(state().auth.user.email).toBe("test@valoora.com");

    act(() => {
      state().exp.addExpense({
        amount: 1500,
        category: "Alimentación",
        date: "2026-10-15",
        description: "Supermercado",
      });
    });
    // 3 seed + 1 nuevo
    expect(state().exp.allExpenses).toHaveLength(4);
    expect(state().exp.allExpenses[0].description).toBe("Supermercado");

    act(() => {
      state().exp.setFilters((f) => ({ ...f, category: "Transporte" }));
    });
    expect(state().exp.expenses).toHaveLength(1);

    const id = state().exp.allExpenses[0].id;
    act(() => {
      state().exp.setFilters((f) => ({ ...f, category: "" }));
      state().exp.removeExpense(id);
    });
    expect(state().exp.allExpenses).toHaveLength(3);

    act(() => {
      state().auth.logout();
    });
    expect(state().exp.allExpenses).toHaveLength(0);

    act(() => {
      expect(state().auth.login("test@valoora.com", "1234")).toBe(true);
    });
    expect(state().exp.allExpenses).toHaveLength(3);
  });
});
