import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const FOCUSABLE_SELECTOR =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

/**
 * Diálogo modal accesible renderizado en un portal sobre document.body.
 *
 * - Cierra con Escape y con click en el backdrop.
 * - Bloquea el scroll del body mientras está abierto.
 * - Mueve el foco al primer elemento interactivo y lo restaura al cerrar.
 *
 * @param {boolean}  isOpen
 * @param {Function} onClose
 * @param {string}   title    Título; también se usa como aria-label.
 * @param {ReactNode} footer  Acciones del pie (ej. botones).
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
  ...rest
}) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current?.();
    };
    document.addEventListener("keydown", handleKeyDown);

    const focusTarget =
      dialogRef.current?.querySelector(FOCUSABLE_SELECTOR) ?? dialogRef.current;
    focusTarget?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={[styles.dialog, className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        {...rest}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
