import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* Moved Router to this level so that we can access useHistory() from within App. */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);