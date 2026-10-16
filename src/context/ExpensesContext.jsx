import { useState } from "react";
import { expenseService } from "../api/expenseService";
import { useAuth } from "../hooks/useAuth";
import { ExpensesContext } from "./expenses-context";

export const ExpensesProvider = ({ children }) => {
  const { user } = useAuth();
  const [prevUserId, setPrevUserId] = useState(user?.id ?? null);
  const [expenses, setExpenses] = useState(() =>
    user ? expenseService.getExpenses(user.id) : [],
  );
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    startDate: "",
    endDate: "",
  });

  // Recargar gastos cuando cambia el usuario (login/logout).
  // Se ajusta durante el render (patrón soportado por React) en lugar de
  // con un effect, para cumplir la regla react-hooks/set-state-in-effect.
  // La lectura a localStorage es idempotente y el seed solo corre una vez.
  if ((user?.id ?? null) !== prevUserId) {
    setPrevUserId(user?.id ?? null);
    setExpenses(user ? expenseService.getExpenses(user.id) : []);
  }

  const addExpense = (expenseData) => {
    if (!user) return;
    const newExpense = expenseService.addExpense({
      ...expenseData,
      userId: user.id,
    });
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedData) => {
    const updated = expenseService.updateExpense(id, updatedData);
    if (updated) {
      setExpenses((prev) => prev.map((exp) => (exp.id === id ? updated : exp)));
    }
  };

  const removeExpense = (id) => {
    expenseService.deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Filtrado avanzado de gastos
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = filters.category
      ? exp.category === filters.category
      : true;
    const matchesSearch = filters.search
      ? exp.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        exp.category.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const matchesStartDate = filters.startDate
      ? exp.date >= filters.startDate
      : true;
    const matchesEndDate = filters.endDate ? exp.date <= filters.endDate : true;

    return (
      matchesCategory && matchesSearch && matchesStartDate && matchesEndDate
    );
  });

  return (
    <ExpensesContext.Provider
      value={{
        expenses: filteredExpenses,
        allExpenses: expenses,
        filters,
        setFilters,
        addExpense,
        updateExpense,
        removeExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
