export function formatCurrency(amount, locale = "es-AR", currency = "ARS") {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return "$0";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}
