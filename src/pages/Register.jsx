import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    if (!validateRequired(formData.name)) {
      newErrors.name = "El nombre es requerido";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = register({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password,
    });
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>Regístrate para empezar a gestionar tus gastos</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Input
          label="Nombre completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" fullWidth size="lg">
          Registrarse
        </Button>
      </form>
      <p className={styles.footerText}>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className={styles.link}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
