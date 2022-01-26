import { Switch, Route, Redirect, useHistory, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import initialArticles from './data';
import ArticlesPage from './ArticlesPage';
import GalleryPage from './GalleryPage';
import { AppBar, makeStyles, Tab, Tabs, Toolbar, Typography, CssBaseline } from '@material-ui/core';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    marginRight: theme.spacing(3)
  }
}));

/**
 * All possible top-level navigation paths
 */
const navbarTabs = [
  { title: 'Articles', path: '/articles' },
  { title: 'Gallery', path: '/gallery' }
];

/**
 * A hook which gets the navbar tab index from the path
 */
function useTabIndex() {
  const { pathname } = useLocation();
  for (let i = 0; i < navbarTabs.length; i++) {
    if (pathname.startsWith(navbarTabs[i].path))
      return i;
  }
  return 0;
}

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
function App() {

  const [articles, setArticles] = useState(initialArticles);
  const history = useHistory();
  const classes = useStyles();
  const tabIndex = useTabIndex();

  /**
   * Handles the "add article" functionality by adding a new article to the articles list and redirecting
   * the user to the new article.
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

    // Redirect the user to it
    history.replace(`/articles/${newArticle.id}`);
  }

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">

          <Typography variant="h6" className={classes.title}>
            Article viewer
          </Typography>

          <Tabs value={tabIndex} aria-label="main navigation tabs">
            {navbarTabs.map((tab, index) => (
              <Tab key={index} label={tab.title} component={Link} to={tab.path} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/articles">
          <ArticlesPage articles={articles}
            onAddArticle={handleAddArticle}
            onCancelNewArticle={() => history.goBack()} />
        </Route>
        <Route path="/gallery">
          <GalleryPage articles={articles} />
        </Route>
        <Route path="*">
          <Redirect to="/articles" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;