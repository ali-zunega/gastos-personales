import ExpensesManager from "../components/expense/ExpensesManager.jsx";
import styles from "./Gastos.module.css";

export default function Gastos() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Gastos</h1>
        <p className={styles.subtitle}>Registra, edita y filtra tus gastos</p>
      </div>
      <ExpensesManager />
    </div>
  );
}
