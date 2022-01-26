import React from 'react';
import styles from './card.module.css';

/**
 * Renders a "card", wwhich has an optional image, a title, and arbitrary content (defined by
 * this component's children).
 * 
 * @param img The image to display at the top of the card, if any
 * @param title The card title
 * @param children Any child elements to display within the card body
 */
export default function Card({ img, title, children }) {
    return (
        <div className={styles.card}>
            {img && <img src={img} alt="" />}
            <div className={styles.cardText}>
                {title && <h1>{title}</h1>}
                {children}
            </div>
        </div>
    );
}