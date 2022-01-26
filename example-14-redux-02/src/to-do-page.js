import React from 'react';
import { ColumnLayout, Column } from './layout-components/column-layout';
import Card from './layout-components/card';
import ToDoList from './components/to-do-list';
import { connect } from 'react-redux';
import { setTodoComplete } from './redux/actions';

/**
 * This page can now be a functional component - doesn't need to maintain its own state now.
 * 
 * Renders a two-column layout. The first column displays the to-do items in a list, while
 * allowing their completed status to be toggled. The second column contains a summary of how many items are
 * complete / incomplete.
 */
function ToDoPage({ todos, setTodoComplete }) {

    const numCompleted = todos.filter(todo => todo.completed).length;
    const numIncomplete = todos.length - numCompleted;

    return (
        <ColumnLayout columns="1fr 300px">

            <Column>
                <ToDoListCard todos={todos} onSetComplete={e => setTodoComplete(e.index, e.isComplete)} />
            </Column>

            <Column>
                <SummaryCard numCompleted={numCompleted} numIncomplete={numIncomplete} />
            </Column>
        </ColumnLayout>
    );
}

// This code connects TodoPage to the Redux store.
// -------------------------------------------------------------
/**
 * This function will configure the ToDoPage to have the to-do list from the Redux store
 * accessible via a prop called "todos".
 * 
 * @param state The entire Redux state tree
 */
function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

/**
 * This object will configure the ToDoPage to have a property called "setTodoComplete".
 * That property will be a function which will dispatch the Redux action with the same name
 * to the store.
 */
const mapDispatchToProps = {
    setTodoComplete
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps, mapDispatchToProps)(ToDoPage);
// -------------------------------------------------------------

/**
 * Renders a Card containing a ToDoList displaying the given items.
 * 
 * @param todos The to-do items to display
 * @param onSetComplete The event handler to be called when the completed status of an item should be changed
 */
function ToDoListCard({ todos, onSetComplete }) {
    return (
        <Card title="My To-Dos">
            <ToDoList todos={todos} onSetComplete={e => onSetComplete(e)} />
        </Card>
    );
}

/**
 * Renders a Card containing information about the number of complete / incomplete to-do items.
 * 
 * @param numCompleted The number of completed to-do items
 * @param numIncomplete The number of incomplete to-do items
 */
function SummaryCard({ numCompleted, numIncomplete }) {
    return (
        <Card title="Summary">
            <p>Completed items: <strong>{numCompleted}</strong></p>
            <p>Still to-do: <strong>{numIncomplete}</strong></p>
        </Card>
    );
}