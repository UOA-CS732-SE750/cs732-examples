import React from 'react';
import styles from './nav-bar.module.css';
import { NavLink } from 'react-router-dom';

/**
 * Renders a nav containing some number of NavLinks, as well as arbitrary content before and after those links.
 * 
 * @param beforeLinks Any components to render on the navbar before the links. Left-aligned by default.
 * @param links Any links to render on the navbar. Each link should have a `path` and `text`. Centered by default.
 * @param afterLinks Any components to render on the navbar after the links. Right-aligned by default.
 */
export default function NavBar({ beforeLinks, links, afterLinks }) {
    return (
        <nav className={styles.nav}>
            <div className={styles.before}>{beforeLinks}</div>
            <div className={styles.links}>
                {links.map((link, index) =>
                    <NavLink key={index} to={link.path} activeClassName={styles.activeLink}>{link.text}</NavLink>)}
            </div>
            <div className={styles.after}>{afterLinks}</div>
        </nav>
    )
}