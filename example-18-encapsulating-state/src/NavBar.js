import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <NavLink to="/articles" activeClassName={styles.activeLink}>Articles</NavLink>
            <NavLink to="/gallery" activeClassName={styles.activeLink}>Gallery</NavLink>
        </div>
    );
}