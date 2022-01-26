import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './AppContextProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// Enable service workers (production only). Change to "unregister" to
// kill any existing service worker for this site (or you can do it from the browser dev tools)
serviceWorkerRegistration.register();
