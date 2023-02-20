import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import initialArticles from './data';
import ArticlesPage from './ArticlesPage';
import GalleryPage from './GalleryPage';
import PageWithNavbar from './PageWithNavbar';
import { ArticleNotFound, PageNotFound } from './ErrorPages';
import ArticleView from './ArticleView';
import NewArticleForm from './NewArticleForm';

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
export default function App() {

  // Stores the list of articles
  const [articles, setArticles] = useState(initialArticles);

  /**
   * The navigate function can be used to programatically navigate to other areas of your website. It's used in
   * the handleAddArticle function below (but we need to grab it here, since useNavigate is a hook).
   */
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

    /**
     * Redirect the user to it.
     * Setting the "replace" option will replace the current URL with the new one (so that if the user presses the "back"
     * button on their browser, they won't go back to the "new article" page).
     */
    navigate(`/articles/${newArticle.id}`, { replace: true });
  }

  return (
    <Routes>
      {/* Will match any path beginning with "/", e.g. /articles, /gallery, /articles/3, /some/other/path, etc. */}
      <Route path="/" element={<PageWithNavbar />}>

        {/**
          * Will match exactly / (due to the "index" prop).
          * The <Navigate> will cause the page to redirect to /articles
          */}
        <Route index element={<Navigate to="articles" replace />} />

        {/**
          * Will match the parent path ("/"), plus "articles", plus anything else, e.g.
          * /articles, /articles/3, /articles/junk/notarealpath, etc.
          */}
        <Route path="articles" element={<ArticlesPage articles={articles} />}>

          {/**
            * Will match exactly /articles (due to the "index" prop).
            * The <Navigate> will cause the page to redirect to /articles/<id>, where <id> is the first article's id.
            */}
          <Route index element={<Navigate to={`${articles[0].id}`} replace />} />

          {/**
            * Will match /articles/:id, where :id is a path parameter. We will read this parameter (see ArticleViewFromPathParams
            * below) and use it to display a specific article with the matching id.
            */}
          <Route path=":id" element={<ArticleViewFromPathParams articles={articles} />} />

          {/**
            * Will match /articles/newArticle. Note that because this is more specific than /articles/:id above, this one will
            * be chosen first, if it's a match.
            */}
          <Route path="newArticle" element={<NewArticleForm onAddArticle={handleAddArticle} />} />

        </Route>

        {/* Will match /gallery */}
        <Route path="gallery" element={<GalleryPage articles={articles} />} />

        {/* Default, if nothing else matches. */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

/**
 * Attempts to get the "id" path param (see line 71 above) using the useParams() hook, and will display an article with
 * the matching id, if any. If no article id matches, an "article not found" page will be displayed instead.
 */
function ArticleViewFromPathParams({ articles }) {
  const { id } = useParams();
  const article = articles.find(a => a.id == id);

  if (article) {
    return <ArticleView article={article} />;
  }
  else {
    return <ArticleNotFound />;
  }
}