/**
 * Retorna la fecha actual en formato YYYY-MM-DD
 */
export function getCurrentDateString() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Formatea una fecha YYYY-MM-DD a un formato legible (ej: 15 Oct 2026)
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Filtra si una fecha corresponde al mes y año actual
 */
export function isCurrentMonth(dateString) {
  if (!dateString) return false;
  const expenseDate = new Date(dateString);
  const now = new Date();

  return (
    expenseDate.getMonth() === now.getMonth() &&
    expenseDate.getFullYear() === now.getFullYear()
  );
}
