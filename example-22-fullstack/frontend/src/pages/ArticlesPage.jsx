import { Switch, Route, useRouteMatch } from "react-router-dom";
import SingleArticlePage from "./SingleArticlePage";
import ArticlesSummaryPage from "./ArticlesSummaryPage";

export default function ArticlesPage() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <ArticlesSummaryPage />
        </Route>
        <Route path={`${path}/:id`}>
          <SingleArticlePage />
        </Route>
      </Switch>
    </>
  );
}
