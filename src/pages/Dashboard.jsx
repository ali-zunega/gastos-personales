import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useExpenses } from "../hooks/useExpenses";
import SummaryCards from "../components/expense/SummaryCards.jsx";
import ExpenseList from "../components/expense/ExpenseList.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./Dashboard.module.css";

const COLORS = [
  "#5f2ee5",
  "#a78bfa",
  "#7a3ff2",
  "#4c1d95",
  "#d8c8ff",
  "#ede9fe",
];

function groupByMonth(expenses) {
  const map = new Map();
  expenses.forEach((exp) => {
    if (!exp.date) return;
    const date = new Date(exp.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const label = date.toLocaleDateString("es-AR", {
      month: "short",
      year: "numeric",
    });
    const current = map.get(key) || { key, label, amount: 0 };
    current.amount += Number(exp.amount) || 0;
    map.set(key, current);
  });
  return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
}

function groupByCategory(expenses) {
  const map = new Map();
  expenses.forEach((exp) => {
    const category = exp.category || "Otros";
    const current = map.get(category) || { name: category, value: 0 };
    current.value += Number(exp.amount) || 0;
    map.set(category, current);
  });
  return Array.from(map.values()).sort((a, b) => b.value - a.value);
}

function formatCurrencyNumber(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const { user } = useAuth();
  const { allExpenses, expenses } = useExpenses();

  const baseExpenses = allExpenses.length > 0 ? allExpenses : expenses;
  const recentExpenses = [...baseExpenses].slice(0, 3);
  const monthData = useMemo(() => groupByMonth(baseExpenses), [baseExpenses]);
  const categoryData = useMemo(
    () => groupByCategory(baseExpenses),
    [baseExpenses]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bienvenido, {user?.name || "Usuario"}</h1>
        <p className={styles.subtitle}>Resumen de tus gastos</p>
      </div>

      <SummaryCards expenses={baseExpenses} />

      <section className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Gastos por mes</h2>
          {monthData.length === 0 ? (
            <p className={styles.emptyChart}>No hay datos suficientes</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => formatCurrencyNumber(value)} />
                <Bar dataKey="amount" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Distribución por categoría</h2>
          {categoryData.length === 0 ? (
            <p className={styles.emptyChart}>No hay datos suficientes</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrencyNumber(value)} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className={styles.recentSection}>
        <div className={styles.recentHeader}>
          <h2 className={styles.sectionTitle}>Gastos recientes</h2>
          <Link to="/gastos" className={styles.linkBtn}>
            Ver todos los movimientos
          </Link>
        </div>
        <ExpenseList
          expenses={recentExpenses}
          emptyMessage="No hay gastos registrados aún."
        />
      </section>
    </div>
  );
}
