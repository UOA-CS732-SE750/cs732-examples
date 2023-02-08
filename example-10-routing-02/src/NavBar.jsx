import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <NavLink to="/articles" className={({ isActive }) => isActive ? styles.activeLink : undefined}>Articles</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? styles.activeLink : undefined}>Gallery</NavLink>
        </div>
    );
}