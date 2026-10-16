import { useState } from "react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import { CATEGORIES } from "../../api/models";
import { getCurrentDateString } from "../../utils/dateUtils";
import { validateExpenseForm } from "../../utils/validators";
import styles from "./ExpenseForm.module.css";

const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({
  value: category,
  label: category,
}));

const buildInitialValues = (expense) => ({
  amount: expense ? String(expense.amount) : "",
  category: expense?.category ?? "",
  date: expense?.date ?? getCurrentDateString(),
  description: expense?.description ?? "",
});

/**
 * Formulario de alta/edición de gastos. Presentacional y controlado: no
 * conoce el contexto, solo emite el gasto normalizado vía `onSubmit`.
 *
 * @param {object}   [expense]  Gasto a editar; si se omite, es alta.
 * @param {Function} onSubmit   Recibe el gasto normalizado ({ amount, category, date, description }).
 * @param {Function} onCancel
 */
export default function ExpenseForm({ expense, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => buildInitialValues(expense));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors: nextErrors } = validateExpenseForm(values);
    setErrors(nextErrors);
    if (!isValid) return;

    onSubmit?.({
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
      description: values.description.trim(),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label="Monto"
        name="amount"
        inputMode="decimal"
        placeholder="0.00"
        value={values.amount}
        onChange={handleChange}
        error={errors.amount}
      />

      <Select
        label="Categoría"
        name="category"
        placeholder="Seleccioná una categoría"
        options={CATEGORY_OPTIONS}
        value={values.category}
        onChange={handleChange}
        error={errors.category}
      />

      <Input
        label="Fecha"
        name="date"
        type="date"
        value={values.date}
        onChange={handleChange}
        error={errors.date}
      />

      <Input
        label="Descripción (opcional)"
        name="description"
        placeholder="Ej. Supermercado"
        value={values.description}
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{expense ? "Guardar cambios" : "Agregar gasto"}</Button>
      </div>
    </form>
  );
}
