import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import ArticleView from './ArticleView';
import ArticleSidebar from './ArticleSidebar';
import LoadingBar from './LoadingBar';
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

export default function ArticlesPage() {

    // Using our custom hook (from within AppContextProvider) which exposes the articles
    // which will be fetched, along with a value indicating whether they've finished being loaded.
    const { articles, articlesLoading } = useContext(AppContext);

    const { url, path } = useRouteMatch();

    return (
        <>

            <aside>
                <ArticleSidebar />
            </aside>

            <main>

                {/* Render either the "loading..." message, OR the articles, if they've finished being loaded. */}
                {articlesLoading ?
                    (
                        <div className="box">
                            <LoadingBar title="Loading articles..." />
                        </div>
                    ) : (
                        <Switch>
                            <Route path={`${path}/:id`}>
                                <div className="box">
                                    <ArticleViewFromRoute articles={articles} />
                                </div>
                            </Route>

                            <Route path="*">
                                {articles && articles.length > 0 && <Redirect to={`${url}/${articles[0].id}`} />}
                            </Route>
                        </Switch>
                    )}

            </main>
        </>
    );
}

/**
 * This component reads the "id" path parameter, and renders an <ArticleView> displaying the article
 * from the given list of articles with the matching id.
 */
function ArticleViewFromRoute({ articles }) {
    const { id } = useParams();
    <ArticleView article="something" />
    return <ArticleView article={articles.find(a => a.id === id)} />
}