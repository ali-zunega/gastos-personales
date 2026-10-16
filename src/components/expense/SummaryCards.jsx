import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { isCurrentMonth } from "../../utils/dateUtils";
import styles from "./SummaryCards.module.css";

const getTopCategory = (expenses) => {
  const totals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] ?? 0) + Number(exp.amount);
    return acc;
  }, {});

  const entries = Object.entries(totals);
  if (entries.length === 0) return null;

  return entries.reduce((max, entry) => (entry[1] > max[1] ? entry : max));
};

/**
 * Tarjetas de resumen del mes actual (total, movimientos, promedio y
 * categoría principal). Presentacional: recibe la lista completa de gastos.
 *
 * @param {Array} expenses  Lista de gastos (sin filtrar) sobre la que resumir.
 */
export default function SummaryCards({ expenses = [] }) {
  const summary = useMemo(() => {
    const current = expenses.filter((exp) => isCurrentMonth(exp.date));
    const total = current.reduce((acc, exp) => acc + Number(exp.amount), 0);
    const top = getTopCategory(current);

    return {
      total,
      count: current.length,
      average: current.length ? total / current.length : 0,
      top,
    };
  }, [expenses]);

  const cards = [
    { label: "Total del mes", value: formatCurrency(summary.total) },
    { label: "Movimientos", value: String(summary.count) },
    { label: "Promedio por gasto", value: formatCurrency(summary.average) },
    {
      label: "Categoría principal",
      value: summary.top ? summary.top[0] : "—",
      hint: summary.top ? formatCurrency(summary.top[1]) : undefined,
    },
  ];

  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <article key={card.label} className={styles.card}>
          <span className={styles.label}>{card.label}</span>
          <span className={styles.value}>{card.value}</span>
          {card.hint && <span className={styles.hint}>{card.hint}</span>}
        </article>
      ))}
    </div>
  );
}
