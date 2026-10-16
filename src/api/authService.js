import { createUser } from "./models";

const USERS_KEY = "valoora_users";
const CURRENT_USER_KEY = "valoora_current_user";

export const authService = {
  register({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("El correo electrónico ya se encuentra registrado.");
    }

    const newUser = { ...createUser({ name, email }), password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Auto-login tras el registro exitoso
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new Error(
        "Credenciales inválidas. Verifica tu correo o contraseña.",
      );
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};
