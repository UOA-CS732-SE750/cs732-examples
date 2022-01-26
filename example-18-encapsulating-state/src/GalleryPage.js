import { useContext } from 'react';
import styles from './GalleryPage.module.css';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContextProvider';

/**
 * Displays a grid of all images in the given list of articles, along with links
 * to view the articles themselves.
 */
export default function GalleryPage() {

    // Grab the articles from the app context
    const { articles } = useContext(AppContext);

    return (
        <main className={styles.gallery}>
            {articles.map(article =>
                <div key={article.id} className={`box ${styles.imageBox}`}>
                    <img src={article.image} />
                    <p className={styles.caption}>
                        <span>From article: </span>
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                    </p>
                </div>)}
        </main>
    );
}