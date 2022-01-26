import { ADD_TODO, SET_TODO_COMPLETE, ADD_EVENT } from './action-types';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function setTodoComplete(index, completed) {
    return {
        type: SET_TODO_COMPLETE,
        index,
        completed
    }
}

export function addEvent(event) {
    return {
        type: ADD_EVENT,
        event
    }
}