import Button from "../ui/Button.jsx";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateUtils";
import styles from "./ExpenseItem.module.css";

/**
 * Fila de la lista de gastos. Componente presentacional: recibe el gasto y
 * delega las acciones al padre mediante callbacks.
 *
 * @param {object}   expense    Gasto a mostrar.
 * @param {Function} onEdit     Recibe el gasto completo.
 * @param {Function} onDelete   Recibe el id del gasto.
 */
export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const { id, description, category, date, amount } = expense;

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.category}>{category}</span>
        <span className={styles.description}>
          {description || "Sin descripción"}
        </span>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>

      <span className={styles.amount}>{formatCurrency(amount)}</span>

      <div className={styles.actions}>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit?.(expense)}
          aria-label={`Editar gasto ${description || category}`}
        >
          Editar
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete?.(id)}
          aria-label={`Eliminar gasto ${description || category}`}
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
}
