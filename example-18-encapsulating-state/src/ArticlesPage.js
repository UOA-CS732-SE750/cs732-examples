import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import ArticleView from './ArticleView';
import ArticleSidebar from './ArticleSidebar';
import NewArticleDialog from './NewArticleDialog';
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

export default function ArticlesPage() {

    const { articles } = useContext(AppContext);
    const { url, path } = useRouteMatch();

    return (
        <>

            <aside>
                <ArticleSidebar />
            </aside>

            <main>
                {/* Secondary-level switch - can be nested fine. */}
                <Switch>
                    <Route path={`${path}/:id`}>
                        <div className="box">
                            <ArticleViewFromRoute articles={articles} />
                        </div>
                    </Route>

                    {/* Going anywhere unrecognized will cause the page to redirect to the
                        first article. */}
                    <Route path="*">
                        <Redirect to={`${url}/${articles[0].id}`} />
                    </Route>
                </Switch>

                {/* This Switch will be rendered regardless of which of the above Routes matches.
                    It will display the "add article" dialog if required. */}
                <Switch>
                    <Route path={`${path}/*/newArticle`}>
                        <NewArticleDialog />
                    </Route>
                </Switch>

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
    return <ArticleView article={articles.find(a => a.id == id)} />
}