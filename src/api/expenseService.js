import { createExpense } from "./models";

const EXPENSES_KEY = "valoora_expenses";

const INITIAL_SEED_EXPENSES = [
  {
    id: "exp_seed_1",
    userId: "usr_mock_1",
    amount: 45000,
    category: "Alimentación",
    date: new Date().toISOString().split("T")[0],
    description: "Compra semanal en supermercado",
  },
  {
    id: "exp_seed_2",
    userId: "usr_mock_1",
    amount: 15000,
    category: "Transporte",
    date: new Date().toISOString().split("T")[0],
    description: "Carga de combustible / tarjeta de transporte",
  },
  {
    id: "exp_seed_3",
    userId: "usr_mock_1",
    amount: 30000,
    category: "Servicios",
    date: new Date().toISOString().split("T")[0],
    description: "Pago de Internet y telefonía",
  },
];

export const expenseService = {
  seedIfEmpty() {
    const expenses = localStorage.getItem(EXPENSES_KEY);
    if (!expenses) {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(INITIAL_SEED_EXPENSES));
    }
  },

  getExpenses(userId) {
    this.seedIfEmpty();
    const expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY) || "[]");
    if (!userId) return expenses;
    // Retorna los gastos del usuario o los de demostración iniciales
    return expenses.filter(
      (exp) => exp.userId === userId || exp.userId === "usr_mock_1",
    );
  },

  addExpense(expenseData) {
    this.seedIfEmpty();
    const expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY) || "[]");
    const newExpense = createExpense(expenseData);

    expenses.unshift(newExpense); // Nuevos al principio para mejor UX
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));

    return newExpense;
  },

  updateExpense(id, updatedData) {
    this.seedIfEmpty();
    let expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY) || "[]");

    expenses = expenses.map((exp) => {
      if (exp.id === id) {
        return {
          ...exp,
          ...updatedData,
          amount: updatedData.amount ? Number(updatedData.amount) : exp.amount,
        };
      }
      return exp;
    });

    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    return expenses.find((exp) => exp.id === id);
  },

  deleteExpense(id) {
    this.seedIfEmpty();
    let expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY) || "[]");

    expenses = expenses.filter((exp) => exp.id !== id);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));

    return true;
  },
};
