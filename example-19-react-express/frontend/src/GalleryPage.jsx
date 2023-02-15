import styles from './GalleryPage.module.css';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? '';

export default function GalleryPage() {

    const { articles } = useContext(AppContext);

    return (
        <main className={styles.gallery}>
            {articles.map(article =>
                <div key={article.id} className={`box ${styles.imageBox}`}>
                    <img src={IMAGE_BASE_URL + article.image} />
                    <p className={styles.caption}>
                        <span>From article: </span>
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                    </p>
                </div>)}
        </main>
    );
}