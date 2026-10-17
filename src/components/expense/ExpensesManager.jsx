import { useState } from "react";
import styles from "./ExpensesManager.module.css";
import Modal from "../ui/Modal.jsx";
import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseList from "./ExpenseList.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import SummaryCards from "./SummaryCards.jsx";
import Button from "../ui/Button.jsx";
import { useExpenses } from "../../hooks/useExpenses";

export default function ExpensesManager() {
  const {
    expenses,
    allExpenses,
    filters,
    setFilters,
    addExpense,
    updateExpense,
    removeExpense,
  } = useExpenses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const openCreateForm = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleSubmit = (formData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
    } else {
      addExpense(formData);
    }
    closeForm();
  };

  const handleDelete = (expenseId) => {
    removeExpense(expenseId);
  };

  const summaryExpenses = allExpenses.length > 0 ? allExpenses : expenses;

  return (
    <div className={styles.shell}>
      <div className={styles.content}>
        <div className={styles.aside}>
          <SummaryCards expenses={summaryExpenses} />
        </div>

        <div className={styles.filters}>
          <CategoryFilter
            filters={filters}
            onChange={setFilters}
            resultCount={expenses.length}
            totalCount={allExpenses.length}
          />
        </div>

        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2 className={styles.sectionTitle}>Movimientos</h2>
            <Button size="sm" onClick={openCreateForm}>
              + Nuevo
            </Button>
          </div>

          <ExpenseList
            expenses={expenses}
            onEdit={openEditForm}
            onDelete={handleDelete}
            emptyMessage="No hay gastos que coincidan con los filtros."
          />
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingExpense ? "Editar gasto" : "Nuevo gasto"}
      >
        <ExpenseForm
          expense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>
    </div>
  );
}
