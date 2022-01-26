import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { AppContextProvider } from './AppContextProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* Moved Router to this level so that we can access useHistory() from within App. */}
    <Router>

      {/* Wrap App in AppContextProvider so that App and any of its decendants gain access to
          the state and functions defined within. */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);