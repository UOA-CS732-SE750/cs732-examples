import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesPage from './ArticlesPage';
import GalleryPage from './GalleryPage';
import PageWithNavbar from './PageWithNavbar';
import { ArticleViewFromPathParams } from './ArticleView';
import { PageNotFound, NoArticles } from './ErrorPages';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import LoadingBar from './LoadingBar';

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<PageWithNavbar />}>

        <Route index element={<Navigate to="articles" replace />} />

        <Route path="articles" element={<ArticlesPage />}>

          <Route index element={<NavigateToFirstArticleIfLoaded />} />

          <Route path=":id" element={<ArticleViewFromPathParams />} />

        </Route>

        <Route path="gallery" element={<GalleryPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

/**
 * If we're still loading articles, renders a loading bar. If we've finished loading articles, causes a redirect to the first article's page.
 * Or, if we've finished loading but there are still no articles, renders a "no articles" error page.
 */
function NavigateToFirstArticleIfLoaded() {
  const { articles, articlesLoading } = useContext(AppContext);
  if (articlesLoading) {
    return <LoadingBar />;
  }
  else if (!articlesLoading && articles?.length) {
    return <Navigate to={`${articles[0].id}`} />;
  }
  else {
    return <NoArticles />;
  }
}