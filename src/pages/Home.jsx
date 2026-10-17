import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to="/dashboard" replace />;
}
