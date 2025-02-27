import styles from "./GalleryPage.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

export default function GalleryPage() {
  const { articles } = useContext(AppContext);

  return (
    <main className={styles.gallery}>
      {articles.map((article) => (
        <div key={article.id} className={`box ${styles.imageBox}`}>
          <img src={article.image} />
          <p className={styles.caption}>
            <span>From article: </span>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </p>
        </div>
      ))}
    </main>
  );
}
