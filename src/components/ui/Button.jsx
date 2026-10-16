import styles from "./Button.module.css";

const VARIANTS = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};

const SIZES = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

/**
 * Botón base del sistema de UI.
 *
 * @param {"primary"|"secondary"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} fullWidth  Ocupa el 100% del contenedor.
 * @param {boolean} loading    Muestra spinner y deshabilita la acción.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.button,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
