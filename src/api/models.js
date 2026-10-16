export const CATEGORIES = [
  "Alimentación",
  "Transporte",
  "Entretenimiento",
  "Servicios",
  "Otros",
];

export function createUser({ email, name }) {
  return { id: `usr_${crypto.randomUUID()}`, email, name };
}

export function createExpense({
  userId,
  amount,
  category,
  date,
  description = "",
}) {
  return {
    id: `exp_${crypto.randomUUID()}`,
    userId,
    amount: Number(amount),
    category,
    date,
    description,
  };
}
