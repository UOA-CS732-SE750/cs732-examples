import { Routes, Route, Navigate } from "react-router-dom";
import ArticlesPage from "./ArticlesPage";
import GalleryPage from "./GalleryPage";
import PageWithNavbar from "./PageWithNavbar";
import NewArticleForm from "./NewArticleForm";
import { ArticleViewFromPathParams } from "./ArticleView";
import { PageNotFound } from "./ErrorPages";
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
export default function App() {
  const { articles } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<PageWithNavbar />}>
        <Route index element={<Navigate to="articles" replace />} />

        <Route path="articles" element={<ArticlesPage />}>
          <Route index element={<Navigate to={`${articles[0].id}`} replace />} />

          <Route path=":id" element={<ArticleViewFromPathParams />} />

          <Route path="newArticle" element={<NewArticleForm />} />
        </Route>

        <Route path="gallery" element={<GalleryPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
