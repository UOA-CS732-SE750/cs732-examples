import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import initialArticles from "./data";
import PageWithAppBar from "./PageWithAppBar";
import ArticlesPage from "./ArticlesPage";
import GalleryPage from "./GalleryPage";
import ArticleView from "./ArticleView";
import NewArticleForm from "./NewArticleForm";
import { PageNotFound, ArticleNotFound } from "./ErrorPages";

/**
 * All possible top-level navigation paths
 */
const navbarTabs = [
  { title: "Articles", to: "/articles" },
  { title: "Gallery", to: "/gallery" }
];

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
export default function App() {
  const [articles, setArticles] = useState(initialArticles);
  const navigate = useNavigate();

  /**
   * Handles adding a new article with the given title and content.
   * Adds the article to the list, and then navigates to that article's page.
   */
  function handleAddArticle(title, content) {
    // Add the new article
    const updatedArticles = [...articles];
    const newArticle = {
      id: articles.length + 1,
      title,
      content,
      image: "https://placekitten.com/400/400"
    };
    updatedArticles.push(newArticle);
    setArticles(updatedArticles);

    navigate(`/articles/${newArticle.id}`, { replace: true });
  }

  return (
    <Routes>
      <Route path="/" element={<PageWithAppBar title="MUI Article Viewer" tabs={navbarTabs} />}>
        {/* Auto-navigate to the first article in the list */}
        <Route index element={<Navigate to="articles" replace />} />

        <Route path="articles" element={<ArticlesPage articles={articles} />}>
          <Route index element={<Navigate to={`${articles[0].id}`} replace />} />

          <Route path=":id" element={<ArticleViewFromPathParams articles={articles} />} />

          <Route path="new" element={<NewArticleForm onAddArticle={handleAddArticle} />} />
        </Route>

        <Route path="gallery" element={<GalleryPage articles={articles} />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

function ArticleViewFromPathParams({ articles }) {
  const { id } = useParams();
  const article = articles.find((a) => a.id == id);

  if (article) {
    return <ArticleView article={article} />;
  } else {
    return <ArticleNotFound />;
  }
}
