import axios from 'axios';
import React from 'react';
import useGet from './useGet';

const AppContext = React.createContext({
    articles: []
});

function AppContextProvider({ children }) {

    /**
     * Sets up the app to fetch the articles from a REST API.
     * 
     * This syntax is still object dereferencing, but will rename the variables at the same time.
     * In this case, we're creating two consts - articles and articlesLoading - which have values
     * equal to the "data" and "isLoading" properties of the object returned by useGet(), respectively.
     */
    const {
        data: articles,
        isLoading: articlesLoading
    } = useGet('/api/articles', []);

    // The context value that will be supplied to any descendants of this component.
    const context = {
        articles,
        articlesLoading,
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