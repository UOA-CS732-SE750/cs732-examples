import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { AppContextProvider } from "./AppContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <CssBaseline />
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
