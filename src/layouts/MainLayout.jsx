import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitial = () => {
    if (!user?.name) return "?";
    const firstName = user.name.trim().split(/\s+/)[0];
    return firstName[0]?.toUpperCase() || "?";
  };

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <Logo variant="app" size={40} />
          <span className={styles.brandName}>Valoora</span>
        </Link>
        <div className={styles.userInfo}>
          {user && (
            <>
              <div className={styles.avatar} aria-label={`Avatar de ${user.name}`}>
                {getInitial()}
              </div>
              <span className={styles.userName}>{user.name}</span>
            </>
          )}
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
