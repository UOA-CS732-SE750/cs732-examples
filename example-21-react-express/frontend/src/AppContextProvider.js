import React from 'react';
import useGet from './useGet';

// Create the context
const AppContext = React.createContext({
    articles: []
});

function AppContextProvider({ children }) {

    // Utilize our useGet hook to query our Express API for the articles.
    const articlesGet = useGet('/api/articles', []);

    // The context value that will be supplied to any descendants of this component.
    const context = {
        articles: articlesGet.data,
        articlesLoading: articlesGet.isLoading
    }

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};