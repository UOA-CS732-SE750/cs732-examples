import styles from "./ArticleView.module.css";
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";
import { ArticleNotFound } from "./ErrorPages";
import { useParams } from "react-router-dom";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

export function ArticleView({ article }) {
  return (
    <div className={styles.article}>
      <h2>{article.title}</h2>
      <img src={IMAGE_BASE_URL + article.image} />
      <p>{article.content}</p>
    </div>
  );
}

export function ArticleViewFromPathParams() {
  const { articles } = useContext(AppContext);
  const { id } = useParams();
  const article = articles.find((a) => a.id == id);

  if (article) {
    return <ArticleView article={article} />;
  } else {
    return <ArticleNotFound />;
  }
}
