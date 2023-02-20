import { useState, useEffect } from 'react';

/**
 * A custom hook wrapping a call to useState() to provide a stateful value, along with a call to useEffect() which saves that value
 * to local storage.
 */
export function useLocalStorage(key, initialValue = null) {

    // This syntax for useState() takes a function rather than a value as its "initial value". In this case, if the value of this state
    // hasn't been initialized yet, the function will be called to produce the initial value. The function we've written here will use
    // the initial value contained within local storage if it exists, or the supplied initialValue if not.
    const [value, setValue] = useState(() => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue; /* JSON.parse() is used because the value obtained from local storage will be a
                                                              string and we want to convert it to its proper data type. */
        } catch {
            return initialValue;
        }
    });

    // Add a side-effect of saving the stateful value to local storage with the given key.
    // This works because, if "setValue" is called to change the value, this will cause the component using this hook to re-render.
    // When the component is re-rendered, this side-effect - having access to the new value - will run again, causing local storage
    // to remain in-sync with any updates.
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value)); // JSON.stringify() is the opposite of JSON.parse() it converts any value to a JSON string.
    }, [key, value, setValue])

    return [value, setValue];

}