import { useId } from "react";
import styles from "./Select.module.css";

/**
 * Selector nativo accesible con etiqueta y estados de error/ayuda.
 * Comparte la API visual de `Input` (label, error, hint).
 *
 * @param {Array<{value: string, label: string}>} options
 * @param {string} placeholder  Etiqueta de la opción vacía (value=""). Si se
 *                              omite, no se agrega una opción vacía.
 * @param {string} error        Mensaje de error (activa el estado inválido).
 * @param {string} hint         Texto de ayuda cuando no hay error.
 */
export default function Select({
  label,
  id,
  options = [],
  placeholder,
  error,
  hint,
  className = "",
  ref,
  ...rest
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const message = error || hint;

  const classes = [styles.select, error ? styles.hasError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.control}>
        <select
          id={selectId}
          ref={ref}
          className={classes}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </div>
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
