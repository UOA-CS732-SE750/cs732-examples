import { Routes, Route, Navigate } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import ArticlesSummaryPage from './pages/ArticlesSummaryPage';
import SingleArticlePage from './pages/SingleArticlePage';
import NewArticlePage from './pages/NewArticlePage';
// import LoadingPage from './pages/LoadingPage';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import PageWithAppBar from './pages/PageWithAppBar';

/**
 * All possible top-level navigation paths
 */
const navbarTabs = [
  { title: 'Articles', to: '/articles' },
  { title: 'Gallery', to: '/gallery' },
  { title: 'Compose', to: '/newArticle' }
];

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 */
function App() {

  const { articlesLoading } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<PageWithAppBar title="Blogogog" tabs={navbarTabs} />}>
        <Route index element={<Navigate to="/articles" />} />

        <Route path="articles">
          <Route index element={<ArticlesSummaryPage />} />
          <Route path=":id" element={<SingleArticlePage />} />
        </Route>

        <Route path="gallery" element={<GalleryPage />} />

        <Route path="newArticle" element={<NewArticlePage />} />

      </Route>
    </Routes>
  );
}

export default App;