import { useState } from 'react';
import initialArticles from './initial-articles';
import ArticleView from './ArticleView';
import AddArticleComponent from './AddArticleComponent';

/**
 * The main application page. Displays an "about me" section, and a list of articles (if any).
 * Also displays a textbox allowing users to add new articles. This component keeps track of all its articles using state.
 */
function App() {

  /*
   * Obtain the current list of articles, along with a function we can use to update the articles list, from the
   * useState() react hook. The supplied argument (initialArticles) will be used as the initial value for this state.
   */
  const [articles, setArticles] = useState(initialArticles);

  return (
    <div className="container">

      <h1>Articles</h1>
      <div className="articleContainer">

        {articles && articles.length > 0 ?
          articles.map(article => <ArticleView key={article.id} article={article} />) :
          <p>There are no articles :(</p>}

        {/**
          * When we click the "Add" button in our AddArticleComponent, its onAddArticle method will be invoked.
          * We'll respond to this by adding a new article to the existing articles list (using setArticle which
          * is provided above by the React hook useState).
          * 
          * Calling setArticles will cause the <App> component to re-render.
          */}
        <AddArticleComponent onAddArticle={(title, content) => setArticles([
          {
            id: articles.length + 1,
            title,
            content
          },
          ...articles // This adds everything in the existing articles array to the new one.
        ])} />

      </div>

    </div>
  );
}

export default App;