import { useMemo, useState } from "react";
import styles from "./App.module.css";
import Logo from "./components/Logo.jsx";
import Button from "./components/ui/Button.jsx";
import Modal from "./components/ui/Modal.jsx";
import ExpenseForm from "./components/expense/ExpenseForm.jsx";
import ExpenseList from "./components/expense/ExpenseList.jsx";
import CategoryFilter from "./components/expense/CategoryFilter.jsx";
import SummaryCards from "./components/expense/SummaryCards.jsx";

const EMPTY_FILTERS = {
  category: "",
  search: "",
  startDate: "",
  endDate: "",
};

const daysAgo = (offset) => {
  const date = new Date();
  date.setDate(Math.max(1, date.getDate() - offset));
  return date.toISOString().split("T")[0];
};

const INITIAL_EXPENSES = [
  {
    id: "demo_1",
    userId: "demo",
    amount: 45000,
    category: "Alimentación",
    date: daysAgo(1),
    description: "Compra semanal en supermercado",
  },
  {
    id: "demo_2",
    userId: "demo",
    amount: 15000,
    category: "Transporte",
    date: daysAgo(3),
    description: "Carga de combustible",
  },
  {
    id: "demo_3",
    userId: "demo",
    amount: 30000,
    category: "Servicios",
    date: daysAgo(6),
    description: "Internet y telefonía",
  },
  {
    id: "demo_4",
    userId: "demo",
    amount: 12000,
    category: "Entretenimiento",
    date: daysAgo(9),
    description: "Cine y streaming",
  },
];

function App() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((exp) => {
        const matchesCategory = filters.category
          ? exp.category === filters.category
          : true;
        const matchesSearch = filters.search
          ? exp.description
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            exp.category.toLowerCase().includes(filters.search.toLowerCase())
          : true;
        const matchesStartDate = filters.startDate
          ? exp.date >= filters.startDate
          : true;
        const matchesEndDate = filters.endDate
          ? exp.date <= filters.endDate
          : true;

        return (
          matchesCategory && matchesSearch && matchesStartDate && matchesEndDate
        );
      }),
    [expenses, filters],
  );

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

  const handleSubmit = (data) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id ? { ...exp, ...data } : exp,
        ),
      );
    } else {
      setExpenses((prev) => [
        { id: `exp_${crypto.randomUUID()}`, userId: "demo", ...data },
        ...prev,
      ]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <Logo variant="app" size={42} />
            <div>
              <h1 className={styles.title}>Valoora</h1>
              <p className={styles.subtitle}>Gastos personales</p>
            </div>
          </div>
          <span className={styles.bell} aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className={styles.badge}>3</span>
          </span>
        </header>

        <div className={styles.content}>
          <div className={styles.aside}>
            <SummaryCards expenses={expenses} />
          </div>

          <div className={styles.filters}>
            <CategoryFilter
              filters={filters}
              onChange={setFilters}
              resultCount={filteredExpenses.length}
              totalCount={expenses.length}
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
              expenses={filteredExpenses}
              onEdit={openEditForm}
              onDelete={handleDelete}
              emptyMessage="No hay gastos que coincidan con los filtros."
            />
          </div>
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
    </main>
  );
}

export default App;
