import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
    articles: []
});

function AppContextProvider({ children }) {

    // Sets up the app to fetch the articles from a REST API.
    const {
        data: articles,
        isLoading: articlesLoading,
        refresh: refreshArticles
    } = useGet('/api/articles', []);

    /**
     * First, uploads the given image to the server, and retrieves the URL pointing to that image.
     * Then, saves the article itself, and returns the server representation of the article which
     * will ahve the id and date assigned.
     * 
     * TODO Error handling...
     */
    async function addArticle(title, image, content) {

        const imgUploadConfig = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const imgFormData = new FormData();
        imgFormData.append('image', image);
        const imgUploadResponse = await axios.post('/api/images', imgFormData, imgUploadConfig);

        const imageUrl = imgUploadResponse.headers['location'];

        const articleToUpload = {
            title,
            image: imageUrl,
            content
        };

        const articleResponse = await axios.post('/api/articles', articleToUpload);
        refreshArticles();
        return articleResponse.data;
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        articles,
        articlesLoading,
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