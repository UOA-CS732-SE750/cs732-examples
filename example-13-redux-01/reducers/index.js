import { combineReducers } from 'redux';
import todos from './todos';
import events from './events';

/**
 * combineReducers is a helper function which returns a combined reducer function based on its input.
 * 
 * In our case: Our state has a "todos" and a "events" property.
 * The object keys supplied below match these, and also refer to our reducer functions.
 * Redux will look at the key names ("todos", and "events"), and supply those parts of the whole
 * state object to each child reducer, respectively.
 */
export default combineReducers({
    todos,
    events
});

// Essentially returns this function:
// function rootReducer(state = {}, action) {
//     return {
//         todos: todos(state.todos, action),
//         events: events(state.events, action)
//     }
// }