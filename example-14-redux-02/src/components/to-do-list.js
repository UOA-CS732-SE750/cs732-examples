import React from 'react';
import styles from '../layout-components/table.module.css';

/**
 * Displays a table of to-do items. When a checkbox corresponding to an item's "completed" status is changed,
 * an event will be raised.
 * 
 * NOTE: If we have the following function definition:
 * ```js
 * function ToDoList({ todos, onSetComplete }) { ... }
 * ```
 * Then, we can use `todos` and `onSetComplete` as variables within this function.
 * 
 * Otherwise, if our definition was:
 * ```js
 * function ToDoList(props) { ... }
 * ```
 * Then we would need to use `props.todos` and `props.onSetComplete`.
 * 
 * @see "Destructuring", at https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/
 * 
 * @param todos The to-do items to display
 * @param onSetComplete The event handler to call if a "completed" checkbox is changed.
 */
export default function ToDoList({ todos, onSetComplete }) {

    return (
        <table className={styles.table}>
            <thead>
                <tr><th>Item</th><th>Complete?</th></tr>
            </thead>
            <tbody>
                {todos && todos.map((todo, index) =>
                    <tr key={index}>
                        <td>{todo.text}</td>
                        <td><label>
                            <input type="checkbox" checked={todo.completed} onChange={(e) => onSetComplete({
                                index,
                                isComplete: e.target.checked
                            })} />
                            <span> {todo.completed ? "Complete" : "Incomplete"}</span>
                        </label></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}