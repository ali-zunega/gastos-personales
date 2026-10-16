import { useState } from "react";
import { authService } from "../api/authService";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [error, setError] = useState(null);

  const login = (email, password) => {
    try {
      setError(null);
      const loggedUser = authService.login(email, password);
      setUser(loggedUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const register = (userData) => {
    try {
      setError(null);
      const newUser = authService.register(userData);
      setUser(newUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
