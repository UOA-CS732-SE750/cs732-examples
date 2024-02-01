import React from "react";
import useGet from "./useGet";

// Create the context
const AppContext = React.createContext({
  articles: []
});

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function AppContextProvider({ children }) {
  // Utilize our useGet hook to query our Express API for the articles.

  const articlesGet = useGet(`${API_BASE_URL}/api/articles`, []);

  // The context value that will be supplied to any descendants of this component.
  const context = {
    articles: articlesGet.data,
    articlesLoading: articlesGet.isLoading
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
