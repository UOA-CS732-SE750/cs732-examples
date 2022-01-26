import { combineReducers } from 'redux';
import todos from './todos';
import events from './events';

export default combineReducers({
    todos,
    events
});