import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth";
import { validateEmail, validatePassword } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = login(formData.email, formData.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Accede a tu cuenta de Valoora</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" fullWidth size="lg">
          Iniciar Sesión
        </Button>
      </form>
      <p className={styles.footerText}>
        ¿No tienes cuenta?{" "}
        <Link to="/register" className={styles.link}>
          Regístrate
        </Link>
      </p>
    </div>
  );
}
