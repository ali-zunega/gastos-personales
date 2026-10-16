import ExpenseItem from "./ExpenseItem.jsx";
import styles from "./ExpenseList.module.css";

/**
 * Lista de gastos con estado vacío. Presentacional: recibe los gastos y
 * reenvía las acciones de edición/eliminación al padre.
 *
 * @param {Array}    expenses
 * @param {Function} onEdit
 * @param {Function} onDelete
 * @param {string}   emptyMessage  Texto para el estado vacío.
 */
export default function ExpenseList({
  expenses = [],
  onEdit,
  onDelete,
  emptyMessage = "No hay gastos para mostrar.",
}) {
  if (expenses.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.list}>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
