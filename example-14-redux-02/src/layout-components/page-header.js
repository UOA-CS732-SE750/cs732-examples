import React from 'react';
import styles from './page-header.module.css';

/**
 * Renders a header with a given title an description
 * 
 * @param title The header's title
 * @param description The header's description
 */
export default function PageHeader({ title, description }) {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    );
}