import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
import { AppContextProvider } from './AppContextProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const theme = createTheme({});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <CssBaseline />
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Enable service workers (production only). Change to "unregister" to
// kill any existing service worker for this site (or you can do it from the browser dev tools)
serviceWorkerRegistration.register();
