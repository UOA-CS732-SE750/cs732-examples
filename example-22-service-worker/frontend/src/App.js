import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ArticlesPage from './ArticlesPage';
import GalleryPage from './GalleryPage';

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
function App() {

  return (
    <div className="container">

      <nav>
        <NavBar />
      </nav>

      {/* Top-level routing - pick a page based on the first section of the path. */}
      <Switch>
        <Route path="/articles">
          <ArticlesPage />
        </Route>

        <Route path="/gallery">
          <GalleryPage />
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