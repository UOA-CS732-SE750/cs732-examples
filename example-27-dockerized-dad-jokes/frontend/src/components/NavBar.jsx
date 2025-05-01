import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : null)}>
            Daily Joke
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.active : null)}>
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
