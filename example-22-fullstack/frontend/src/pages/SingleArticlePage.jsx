import { useParams } from "react-router-dom";
import ArticleView from "../components/ArticleView";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

export default function SingleArticlePage() {
  const { articles, articlesLoading } = useContext(AppContext);
  const { id } = useParams();

  if (articlesLoading) {
    return null;
  } else {
    const article = articles.find((a) => a._id === id);

    return (
      <main>
        <ArticleView article={article} />
      </main>
    );
  }
}
