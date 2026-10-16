import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "../components/expense/ExpenseForm.jsx";
import ExpenseList from "../components/expense/ExpenseList.jsx";
import CategoryFilter from "../components/expense/CategoryFilter.jsx";
import SummaryCards from "../components/expense/SummaryCards.jsx";
import { getCurrentDateString } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatCurrency";

const EMPTY_FILTERS = {
  category: "",
  search: "",
  startDate: "",
  endDate: "",
};

// Intl usa un espacio no separable (U+00A0) en el formato de moneda, mientras
// que RTL compara el texto esperado de forma literal. Lo normalizamos.
const money = (amount) => formatCurrency(amount).replace(/\u00a0/g, " ");

describe("ExpenseForm (smoke)", () => {
  it("muestra errores de validación y no envía datos inválidos", async () => {
    const onSubmit = vi.fn();
    render(<ExpenseForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Agregar gasto" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByText("El monto debe ser un número mayor a 0."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Debes seleccionar una categoría válida."),
    ).toBeInTheDocument();
  });

  it("envía el gasto normalizado con datos válidos", async () => {
    const onSubmit = vi.fn();
    render(<ExpenseForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Monto"), "1500");
    await userEvent.selectOptions(
      screen.getByLabelText("Categoría"),
      "Alimentación",
    );
    await userEvent.type(
      screen.getByLabelText(/descripción/i),
      "  Supermercado  ",
    );
    await userEvent.click(screen.getByRole("button", { name: "Agregar gasto" }));

    expect(onSubmit).toHaveBeenCalledWith({
      amount: 1500,
      category: "Alimentación",
      date: getCurrentDateString(),
      description: "Supermercado",
    });
  });

  it("precarga los datos al editar un gasto existente", () => {
    const expense = {
      id: "exp_1",
      amount: 5000,
      category: "Transporte",
      date: "2026-01-15",
      description: "Nafta",
    };
    render(<ExpenseForm expense={expense} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Monto")).toHaveValue("5000");
    expect(screen.getByLabelText("Categoría")).toHaveValue("Transporte");
    expect(screen.getByLabelText(/descripción/i)).toHaveValue("Nafta");
    expect(
      screen.getByRole("button", { name: "Guardar cambios" }),
    ).toBeInTheDocument();
  });
});

describe("ExpenseList (smoke)", () => {
  it("muestra el mensaje de estado vacío", () => {
    render(<ExpenseList expenses={[]} emptyMessage="Nada por acá" />);

    expect(screen.getByText("Nada por acá")).toBeInTheDocument();
  });

  it("renderiza los gastos y propaga edición y eliminación", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const expenses = [
      {
        id: "exp_1",
        amount: 1500,
        category: "Alimentación",
        date: "2026-01-10",
        description: "Supermercado",
      },
      {
        id: "exp_2",
        amount: 800,
        category: "Transporte",
        date: "2026-01-11",
        description: "Colectivo",
      },
    ];
    render(
      <ExpenseList
        expenses={expenses}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("Supermercado")).toBeInTheDocument();
    expect(screen.getByText(money(1500))).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Editar gasto Supermercado" }),
    );
    expect(onEdit).toHaveBeenCalledWith(expenses[0]);

    await userEvent.click(
      screen.getByRole("button", { name: "Eliminar gasto Colectivo" }),
    );
    expect(onDelete).toHaveBeenCalledWith("exp_2");
  });
});

describe("CategoryFilter (smoke)", () => {
  it("propaga los cambios de búsqueda y categoría", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter filters={EMPTY_FILTERS} onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("Buscar"), "x");
    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_FILTERS,
      search: "x",
    });

    await userEvent.selectOptions(
      screen.getByLabelText("Categoría"),
      "Transporte",
    );
    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_FILTERS,
      category: "Transporte",
    });
  });

  it("deshabilita el limpiar cuando no hay filtros activos", () => {
    render(
      <CategoryFilter filters={EMPTY_FILTERS} onChange={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Limpiar filtros" }),
    ).toBeDisabled();
  });

  it("limpia todos los filtros", async () => {
    const onChange = vi.fn();
    render(
      <CategoryFilter
        filters={{ ...EMPTY_FILTERS, search: "abc" }}
        onChange={onChange}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Limpiar filtros" }),
    );

    expect(onChange).toHaveBeenCalledWith(EMPTY_FILTERS);
  });

  it("muestra el contador de resultados", () => {
    render(
      <CategoryFilter
        filters={EMPTY_FILTERS}
        onChange={vi.fn()}
        resultCount={2}
        totalCount={5}
      />,
    );

    expect(screen.getByText("Mostrando 2 de 5")).toBeInTheDocument();
  });
});

describe("SummaryCards (smoke)", () => {
  it("resume solo los gastos del mes actual", () => {
    const today = getCurrentDateString();
    const expenses = [
      { id: "1", amount: 100, category: "Alimentación", date: today },
      { id: "2", amount: 200, category: "Transporte", date: today },
      { id: "3", amount: 999, category: "Otros", date: "2000-01-01" },
    ];
    render(<SummaryCards expenses={expenses} />);

    expect(screen.getByText(money(300))).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Transporte")).toBeInTheDocument();
  });
});
