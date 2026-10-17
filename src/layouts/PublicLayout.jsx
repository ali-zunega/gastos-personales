import { Outlet } from "react-router-dom";
import styles from "./PublicLayout.module.css";

export default function PublicLayout() {
  return (
    <main className={styles.page}>
      <Outlet />
    </main>
  );
}
