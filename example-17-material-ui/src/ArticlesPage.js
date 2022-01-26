import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import ArticleView from './ArticleView';
import ArticleSidebar from './ArticleSidebar';
import NewArticleDialog from './NewArticleDialog';
import { makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export default function ArticlesPage({ articles, onAddArticle, onCancelNewArticle }) {

    const classes = useStyles();

    const { url, path } = useRouteMatch();

    return (
        <>
            <ArticleSidebar articles={articles} />

            <main className={classes.content}>

                <Toolbar variant="dense" />

                <Switch>
                    <Route path={`${path}/:id`}>
                        <ArticleViewFromRoute articles={articles} />
                    </Route>
                    <Route path="*">
                        <Redirect to={`${url}/${articles[0].id}`} />
                    </Route>
                </Switch>

                <Switch>
                    <Route path={`${path}/*/newArticle`}>
                        <NewArticleDialog onAddArticle={onAddArticle} onCancelNewArticle={onCancelNewArticle} />
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
    return <ArticleView article={articles.find(a => a.id == id)} />
}