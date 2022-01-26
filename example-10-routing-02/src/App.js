import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import initialArticles from './data';
import NavBar from './NavBar';
import ArticlesPage from './ArticlesPage';
import GalleryPage from './GalleryPage';

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
function App() {

  const [articles, setArticles] = useState(initialArticles);

  const history = useHistory();

  // Handles when a new article is added.
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

    // Redirect the user to it
    history.replace(`/articles/${newArticle.id}`);
  }

  function handleCancelNewArticle() {
    history.goBack();
  }

  return (
    <div className="container">

      <nav>
        <NavBar />
      </nav>

      {/* Top-level routing - pick a page based on the first section of the path. */}
      <Switch>
        <Route path="/articles">
          <ArticlesPage articles={articles}
            onAddArticle={handleAddArticle}
            onCancelNewArticle={handleCancelNewArticle} />
        </Route>

        <Route path="/gallery">
          <GalleryPage articles={articles} />
        </Route>

        {/* If no other path matches, redirect to /articles */}
        <Route path="*">
          <Redirect to="/articles" />
        </Route>
      </Switch>

    </div>
  );
}

export default App;