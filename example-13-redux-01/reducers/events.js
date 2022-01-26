import { ADD_EVENT } from '../action-types';

/**
 * This function handles modifications to the "events" property of the overall state. Currently supports
 * adding new events.
 * 
 * @param state the current events array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new events array
 */
export default function events(state = [], action) {
    switch (action.type) {

        // To add an event, we create a new array containing all elements in the current array,
        // with the new event added onto the end.
        case ADD_EVENT:
            return [...state, action.event];

        default:
            return state;
    }
}