import { useLocalStorage } from './useLocalStorage';

export default function Counter() {

    const [count, setCount] = useLocalStorage('counter', 0);

    return (
        <button onClick={() => setCount(count + 1)}>
            The current value is: {count}
        </button>
    )
}