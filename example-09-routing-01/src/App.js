import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
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
    <Router>
      <div className="container">

        <div className="sidebar">
          <h1>Articles</h1>
          <ArticleNavBar articles={articles} />
        </div>

        <main>
          {/* If the current URL path matches one of the Routes in this Switch, the components in that Route
              will be rendered. All other components in this Switch will be ignored. In the case of multiple
              matches, only the first match will be rendered. */}
          <Switch>
            {/* Shows how we can obtain a path parameter using : */}
            <Route path="/articles/:id">
              <div className="box">
                <ArticleViewFromRoute articles={articles} />
              </div>
            </Route>
            {/* This path matches all URLs. Because it's defined last in the Switch, it will only be rendered if
                there are no other matches. This is a good way to make a default route. */}
            <Route path="*">
              <div className="box">
                <h2>Please select an article to the left!</h2>
              </div>
            </Route>
          </Switch>
        </main>

      </div>
    </Router>
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