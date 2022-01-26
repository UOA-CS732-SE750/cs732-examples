import articles from './articles';
import ArticleView from './ArticleView';

/**
 * The main application page. Displays an "about me" section, and a list of articles (if any).
 */
function App() {
  // Some of the divs below have classNames defined which are referred by selectors in index.css.
  return (
    <div className="container">

      <h1>Articles</h1>
      <div className="articleContainer">

        {articles && articles.length > 0 ?
          articles.map(article => <ArticleView key={article.id} article={article} />) :
          <p>There are no articles :(</p>}

      </div>

    </div>
  );
}

export default App;