import { useState, useEffect } from 'react';
import styles from './Timer.module.css';

/**
 * Displays a timer allowing the user to start, and stop, a value from incrementing every second.
 * 
 * Shows a more complex example of useEffect(). This time, a cleanup function is used, along with an optional
 * value which controls whether or not the effect function will actually be called.
 */
export default function Timer() {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);

    /**
     * This call to useEffect() starts a timer to increment the timer's value each second, if the timer
     * is active.
     */
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setTimeout(() => setSeconds(seconds + 1), 1000);
        }

        /**
         * Returning a function from useEffect() will have the returned function be called prior to the component
         * unmounting, or the effect being re-run (i.e. usually when the component re-renders again).
         */
        return () => clearTimeout(interval);

    }, [seconds, isActive]); /**
                              * Usually, the side-effect function defined above will be called every time the
                              * component re-renders. In this case though, we don't want that - we only want it
                              * to be called again if the values of "seconds" or "isActive" changes. We can specify
                              * an array as the second argument to useEffect(). If we do, then the effect function will
                              * only be called if the values supplied in this array have changed since the last time
                              * the effect was called.
                              */


    return (
        <div className={styles.timer}>
            <p>{seconds}s</p>
            <button disabled={isActive} onClick={() => setActive(true)}>Start</button>
            <button disabled={!isActive} onClick={() => setActive(false)}>Stop</button>
        </div>
    );
}