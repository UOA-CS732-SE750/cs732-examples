import articles from './articles';
import AboutMe from './AboutMe';
import ArticleView from './ArticleView';

// To test the app's functionality when the articles list is empty,
// comment out line 1 above, and uncomment line 7 below.
// const articles = [];

/**
 * The main application page. Displays an "about me" section, and a list of articles (if any).
 */
function App() {
  return (
    <div>
      {/* Demonstrates the use of a simple React component, supplying its props. */}
      <AboutMe name="Andrew" like="Poke'mon" />

      {/* A more complex example. If the articles list contains data, renders an ArticleView
      for each article. Otherwise, displays a <p> stating that there are no articles. */}
      <h1>Articles</h1>
      {articles && articles.length > 0 ?
        articles.map(article => <ArticleView key={article.id} article={article} />) :
        <p>There are no articles :(</p>}

    </div>
  );
}

export default App;