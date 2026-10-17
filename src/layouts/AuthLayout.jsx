import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Outlet />
      </div>
    </main>
  );
}
