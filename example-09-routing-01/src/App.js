import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useState } from 'react';
import initialArticles from './initial-articles';
import ArticleView from './ArticleView';
import ArticleNavBar from './ArticleNavBar';

/**
 * Renders a sidebar showing the titles of various articles. When the user clicks one, the contents of that article
 * will be shown in the main view.
 */
function App() {

  const [articles, setArticles] = useState(initialArticles);

  return (
    // Because we're using React Router, we should wrap all our other components in a Router.
    <BrowserRouter>
      <div className="container">

        <div className="sidebar">
          <h1>Articles</h1>
          <ArticleNavBar articles={articles} />
        </div>

        <main>

          <div className="box">

            {/* If the current URL path matches one of the Routes in this block, that route's element will be rendered.
              All other components in this block will be ignored. In the case of multiple matches, only the first match
              will be rendered. */}
            <Routes>

              {/* Shows how we can obtain a path parameter using : */}
              <Route
                path="/articles/:id"
                element={<ArticleViewFromRoute articles={articles} />} />

              {/* This path matches all URLs. Because it's defined last in the Routes block, it will only be rendered if
                there are no other matches. This is a good way to make a default route. */}
              <Route
                path="*"
                element={<h2>Please select an article to the left!</h2>} />

            </Routes>

          </div>
        </main>

      </div>
    </BrowserRouter>
  );
}

/**
 * This component reads the "id" path parameter, and renders an <ArticleView> displaying the article
 * from the given list of articles with the matching id.
 */
function ArticleViewFromRoute({ articles }) {
  const { id } = useParams();
  return <ArticleView article={articles.find(a => a.id == id)} />
}

export default App;