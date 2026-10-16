import { useId } from "react";
import styles from "./Input.module.css";

/**
 * Campo de entrada con etiqueta, estado de error y texto de ayuda.
 * Accesible por defecto: asocia label, aria-invalid y aria-describedby.
 *
 * @param {string} label       Texto de la etiqueta.
 * @param {string} error       Mensaje de error (activa el estado inválido).
 * @param {string} hint        Texto de ayuda cuando no hay error.
 * @param {string} id          Id explícito; si se omite se genera uno.
 */
export default function Input({
  label,
  id,
  type = "text",
  error,
  hint,
  className = "",
  ref,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error || hint;

  const classes = [styles.input, error ? styles.hasError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        className={classes}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
      />
      {message && (
        <span
          id={messageId}
          className={error ? styles.error : styles.hint}
          role={error ? "alert" : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
}
