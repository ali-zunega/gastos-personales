import { useContext } from "react";
import { ExpensesContext } from "../context/expenses-context";
export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpenses debe ser utilizado dentro de un ExpensesProvider",
    );
  }
  return context;
};
