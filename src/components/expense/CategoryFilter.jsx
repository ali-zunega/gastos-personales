import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import { CATEGORIES } from "../../api/models";
import styles from "./CategoryFilter.module.css";

const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({
  value: category,
  label: category,
}));

const EMPTY_FILTERS = {
  category: "",
  search: "",
  startDate: "",
  endDate: "",
};

/**
 * Barra de filtros de gastos: búsqueda por texto, categoría y rango de fechas.
 * Presentacional y controlado: reporta los cambios vía `onChange(patch)`.
 *
 * @param {{category: string, search: string, startDate: string, endDate: string}} filters
 * @param {Function} onChange       Recibe el objeto completo de filtros actualizado.
 * @param {number}   [resultCount]  Cantidad de resultados visibles.
 * @param {number}   [totalCount]   Cantidad total de gastos.
 */
export default function CategoryFilter({
  filters,
  onChange,
  resultCount,
  totalCount,
}) {
  const patch = (changes) => onChange?.({ ...filters, ...changes });

  const isFiltered =
    filters.category ||
    filters.search ||
    filters.startDate ||
    filters.endDate;

  const showCount =
    typeof resultCount === "number" && typeof totalCount === "number";

  return (
    <section className={styles.filter}>
      <div className={styles.fields}>
        <div className={styles.search}>
          <Input
            label="Buscar"
            type="search"
            placeholder="Descripción o categoría"
            value={filters.search}
            onChange={(event) => patch({ search: event.target.value })}
          />
        </div>

        <Select
          label="Categoría"
          placeholder="Todas las categorías"
          options={CATEGORY_OPTIONS}
          value={filters.category}
          onChange={(event) => patch({ category: event.target.value })}
        />

        <div className={styles.dateRange}>
          <Input
            label="Desde"
            type="date"
            value={filters.startDate}
            onChange={(event) => patch({ startDate: event.target.value })}
          />

          <Input
            label="Hasta"
            type="date"
            value={filters.endDate}
            onChange={(event) => patch({ endDate: event.target.value })}
          />
        </div>
      </div>

      <div className={styles.footer}>
        {showCount && (
          <span className={styles.count}>
            Mostrando {resultCount} de {totalCount}
          </span>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onChange?.(EMPTY_FILTERS)}
          disabled={!isFiltered}
        >
          Limpiar filtros
        </Button>
      </div>
    </section>
  );
}
