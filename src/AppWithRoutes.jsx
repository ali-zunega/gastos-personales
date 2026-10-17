import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpensesProvider } from "./context/ExpensesContext.jsx";

export default function AppWithRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpensesProvider>
          <AppRoutes />
        </ExpensesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
