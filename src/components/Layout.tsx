import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
   <div className={styles.appShell}>
  <header className={styles.topbar}>
    <div className={styles.brand}>Simple Dashboard 3D</div>

    <nav className={styles.nav}>
      <NavLink
        to="/designers"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        Designers
      </NavLink>
      <NavLink
        to="/editor"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        Editor
      </NavLink>
    </nav>
  </header>

  <main className={styles.content}>
    <Outlet />
  </main>
</div>

  );
}
