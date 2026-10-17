export function validateRequired(value) {
  return value && typeof value === "string" && value.trim().length > 0;
}

export function validateEmail(email) {
  return isValidEmail(email);
}

export function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}

export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidAmount(amount) {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
}

export function validateExpenseForm({ amount, category, date }) {
  const errors = {};

  if (!isValidAmount(amount)) {
    errors.amount = "El monto debe ser un número mayor a 0.";
  }
  if (!category || category.trim() === "") {
    errors.category = "Debes seleccionar una categoría válida.";
  }
  if (!date) {
    errors.date = "La fecha es obligatoria.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
