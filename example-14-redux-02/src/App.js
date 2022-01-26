import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PageHeader from './layout-components/page-header';
import styles from './app.module.css';
import NavBar from './layout-components/nav-bar';
import ToDoPage from './to-do-page';
import CalendarPage from './calendar-page';
import moment from 'moment';
import { connect } from 'react-redux';

/**
 * Renders the page header, navbar, footer, and main content.
 * 
 * The main content is set based on the current URL (achieved using react-router-dom).
 */
function App({ numUpcomingEvents, numPendingTodos }) {
  return (
    <Router>
      <div className={styles.container}>

        <PageHeader title="Organizer" description="Organize your life!" />

        {/* Now it becomes trivial to add any state, anywhere. */}
        <NavBar links={[
          { path: "/todos", text: "My To-Dos" },
          { path: "/calendar", text: "My Calendar" }
        ]} afterLinks={<>
          <p><strong>{numUpcomingEvents}</strong> upcoming events, <strong>{numPendingTodos}</strong> pending to-dos</p>
        </>} />

        <main>
          <Switch>
            <Route path="/todos">
              <ToDoPage />
            </Route>
            <Route path="/calendar">
              <CalendarPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/todos" />
            </Route>
            <Route path="*">
              <p>404 Not Found!!</p>
            </Route>
          </Switch>
        </main>

        <footer>
          <p>&copy; SE750 / CS732, {moment().format("MMMM Do, YYYY")}</p>
        </footer>

      </div>
    </Router>
  );
}

// This code connects App to the Redux store.
// -------------------------------------------------------------
/**
 * This function will configure the App to have a couple of values exposed as properties.
 * These values are calculated from data contained in the Redux store.
 * 
 * @param state The entire Redux state tree
 */
function mapStateToProps(state) {
  const now = moment();
  return {
    numUpcomingEvents: state.events.filter(event => now.isBefore(event.start)).length,
    numPendingTodos: state.todos.filter(todo => !todo.completed).length
  };
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps)(App);
// -------------------------------------------------------------