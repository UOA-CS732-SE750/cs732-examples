import { useState, useEffect } from 'react';
import styles from './Counter.module.css';

/**
 * A simple counter which maintains a value and allows the user to increment and decrement it.
 * 
 * Uses the useEffect() hook to additionally update the document title to reflect the current
 * counter value.
 */
export default function Counter() {
    const [value, setValue] = useState(0);

    // A simple application of useEffect to update a non-React part of the DOM after rendering.
    // This action requires no cleanup so we don't need to return a cleanup function from the effect.
    useEffect(() => {
        document.title = `Counter value: ${value}`;
    });

    return (
        <div className={styles.counter}>
            <button onClick={() => setValue(value - 1)}>Decrement</button>
            <p>Current value: {value}</p>
            <button onClick={() => setValue(value + 1)}>Increment</button>
        </div>
    );
}