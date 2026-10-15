/**
 * Marca Valoora — assets reales generados por el usuario (IA).
 *
 * - `mark`: icono morado transparente (`/valoora-mark.png`). Solo sobre fondos claros.
 * - `app`: icono en cuadrado morado (`/valoora-favicon.png`). Vale en cualquier fondo,
 *   es el mismo del favicon. Ideal para header y tamaños chicos.
 * - `full`: lockup horizontal icono + wordmark (`/logo-completo.png`). Para hero/login.
 *
 * Los PNG son cuadrados (o el full horizontal) y se renderizan con object-fit
 * para no deformarse nunca.
 */
const SOURCES = {
  mark: "/valoora-mark.png",
  app: "/valoora-favicon.png",
  full: "/logo-completo.png",
};

export default function Logo({
  variant = "app",
  size = 40,
  withWordmark = false,
  title = "Valoora — Control y gestión financiera personal",
}) {
  const src = SOURCES[variant] ?? SOURCES.app;

  if (variant === "full") {
    return (
      <img
        src={src}
        alt={title}
        height={size}
        style={{ display: "block", width: "auto", maxWidth: "100%", objectFit: "contain" }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={title}
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{
          display: "block",
          flexShrink: 0,
          objectFit: "contain",
          borderRadius: variant === "app" ? size * 0.24 : 0,
        }}
      />
      {withWordmark && (
        <span style={{ lineHeight: 1.05 }}>
          <span
            style={{
              display: "block",
              fontWeight: 800,
              letterSpacing: "0.04em",
              fontSize: size * 0.52,
              color: "var(--valoora-primary-deep, #4c1d95)",
            }}
          >
            VALOORA
          </span>
          <span
            style={{
              display: "block",
              fontSize: size * 0.24,
              color: "var(--valoora-ink-soft, #4c4a6b)",
            }}
          >
            Control y gestión financiera
          </span>
        </span>
      )}
    </span>
  );
}
