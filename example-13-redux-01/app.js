import rootReducer from './reducers-manual';
// import rootReducer from './reducers';
import { addTodo, setTodoComplete } from './actions';
import { createStore } from 'redux';
import readline from 'readline-sync';

/**
 * This creates the actual redux store.
 * 
 * The store holds the application state and can:
 * - Serve the current state using getState()
 * - Mutate state vis dispatch()ing actions
 * - Add listeners which will be notified when state changes
 */
const store = createStore(rootReducer);

// Log initial state
console.log("Initial state:", store.getState());

// Add a listener to be notified when the state changes.
// The subscribe() function returns another function (we've called unsubscribe here) - we can call this if
// we want to de-register that listener.
const unsubscribe = store.subscribe(() => {
    console.log("State has changed!", store.getState());
});


// Simple command-line app to modify the state.
loop:
while (true) {

    const input = readline.question("What to do? ");
    const cmd = input.split(" ")[0];
    const data = input.substring(input.indexOf(" ") + 1);

    switch (cmd.toLowerCase()) {

        case "add":
            store.dispatch(addTodo(data));
            break;

        case "toggle":
            const i = parseInt(data);
            const todo = store.getState().todos[i];
            if (todo) {
                store.dispatch(setTodoComplete(i, !todo.completed));
            }
            break;

        case "get":
            console.log(`${data}:`, store.getState()[data]);
            break;

        case "quit":
            break loop;

        default:
            console.log("Invalid command");
            break;
    }

}

// Best practice to unsub from store listeners when done.
console.log("Done!");
unsubscribe();