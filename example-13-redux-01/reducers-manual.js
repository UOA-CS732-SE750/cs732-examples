import { ADD_TODO, SET_TODO_COMPLETE, ADD_EVENT } from './action-types';

const initialState = {
    todos: [],
    events: []
}

/**
 * The root reducer handles all state updates based on the provided action.
 * 
 * The "state = initialState" syntax means "if no argument is supplied, use initialState as the default".
 * 
 * @param state The current state
 * @param action The action to perform on the current state
 * @returns what the new state should be
 */
export default function rootReducer(state = initialState, action) {

    // Perform different things based on the type of action
    switch (action.type) {

        // Object.assign() Takes the first object ({} in this case), and assigns all properties of all subsequent objects
        // to it. In this use case, it makes a shallow copy of "state", then modifies it by changing the "todos" array.
        case ADD_TODO:
        case SET_TODO_COMPLETE:
            return Object.assign({}, state, {
                todos: todos(state.todos, action)
            });

        case ADD_EVENT:
            return Object.assign({}, state, {
                visibilityFilter: events(state.events, action)
            });

        default:
            return state;
    }
}

/**
 * This function handles modifications to the "todos" property of the overall state. It handles adding new to-do items,
 * and toggling the "completed" status of existing ones.
 * 
 * @param state the current todos array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new todos array
 */
function todos(state = [], action) {
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

/**
 * This function handles modifications to the "events" property of the overall state. Currently supports
 * adding new events.
 * 
 * @param state the current events array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new events array
 */
function events(state = [], action) {
    switch (action.type) {

        // To add an event, we create a new array containing all elements in the current array,
        // with the new event added onto the end.
        case ADD_EVENT:
            return [...state, action.event];

        default:
            return state;
    }
}