import { ADD_TODO, SET_TODO_COMPLETE } from '../action-types';

/**
 * This function handles modifications to the "todos" property of the overall state. It handles adding new to-do items,
 * and toggling the "completed" status of existing ones.
 * 
 * @param state the current todos array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new todos array
 */
export default function todos(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {

        // To add a to-do item, we create a new array containing all elements in the current array,
        // with the new to-do item added onto the end.
        case ADD_TODO:
            return [
                ...state, /* This syntax means "All items in the state array".
                             It essentially adds all those items to this new array that's being created. */
                {
                    text: action.text,
                    completed: false
                }
            ]

        // To set a to-do item's completed status...
        case SET_TODO_COMPLETE:
            // Return a new array, where...
            return state.map((todo, index) => {

                // ... if this is the to-do item we're toggling...
                if (index === action.index) {
                    // ... we use a copy of that to-do item with its "completed" status changed.
                    return Object.assign({}, todo, {
                        completed: action.completed
                    });
                }

                // ... Otherwise, we use the unmodified to-do item.
                return todo;
            })

        default:
            return state;
    }
}