import useGet from "./hooks/useGet";
import axios from "axios";
import env from "./util/env";
import React from "react";
import { ArticleType } from "common";

const API_BASE_URL = env.VITE_API_BASE_URL;

// This defines the shape of the context that will be provided to components
type AppContextType = {
  articles: ArticleType[];
  articlesLoading: boolean;
  addArticle: (title: string, image: File, content: string) => Promise<ArticleType>;
};

// !!! TypeScript !!!
// Most standard JS and React libaries will accept a generic type parameter <T> in TS
const AppContext = React.createContext<AppContextType>({
  articles: [],

  // These two weren't included in the JS fullstack example.
  // If the app tried to access this value outside of the context provider, it would throw an error - a very hard bug to catch!
  // But TS easily catches this at compile time.
  articlesLoading: false,
  addArticle: async () => {
    throw new Error("addArticle not implemented");
  }
});

function AppContextProvider({ children }: { children: React.ReactNode }) {
  // Sets up the app to fetch the articles from a REST API.
  const {
    data: articles,
    isLoading: articlesLoading,
    refresh: refreshArticles
  } = useGet<ArticleType[]>(`${API_BASE_URL}/api/articles`, []);

  /**
   * First, uploads the given image to the server, and retrieves the URL pointing to that image.
   * Then, saves the article itself, and returns the server representation of the article which
   * will have the id and date assigned.
   *
   * TODO Error handling...
   */
  async function addArticle(title: string, image: File, content: string): Promise<ArticleType> {
    const imgUploadConfig = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const imgFormData = new FormData();
    imgFormData.append("image", image);
    const imgUploadResponse = await axios.post(
      `${API_BASE_URL}/api/images`,
      imgFormData,
      imgUploadConfig
    );

    const imageUrl = imgUploadResponse.headers["location"];

    const articleToUpload = {
      title,
      image: imageUrl,
      content
    };

    const articleResponse = await axios.post(`${API_BASE_URL}/api/articles`, articleToUpload);
    refreshArticles();
    return articleResponse.data;
  }

  // The context value that will be supplied to any descendants of this component.
  const contextValue = {
    articles,
    articlesLoading,
    addArticle
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
