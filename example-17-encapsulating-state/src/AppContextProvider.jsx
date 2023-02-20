import React from 'react';

/**
 * This file shows one possible "best-practice" / "clean code" way in which we can encapsulate
 * some state along with its Context and Provider into one UI-independent wrapper component.
 */

import { useState } from 'react';
import initialArticles from './data';

// Create the context
const AppContext = React.createContext({
    articles: initialArticles
});

/**
 * Wraps the given child components in an AppContext.Provider. That Provider's value
 * contains the articles list used by the app, along with a function to add a new article.
 */
function AppContextProvider({ children }) {

    // Stateful value initialization
    const [articles, setArticles] = useState(initialArticles);

    /**
     * A function which adds an article.
     * 
     * Specifically, sets the articles array to a new array consisting of all articles in the previous
     * array, plus a new article.
     */
    function addArticle({ title, content }) {
        const newArticle = {
            id: articles.length + 1,
            title,
            content,
            image: "https://placekitten.com/400/400"
        };

        setArticles([
            ...articles,
            newArticle
        ]);

        return newArticle;
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        articles,
        addArticle
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