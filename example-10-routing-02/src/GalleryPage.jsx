import styles from './GalleryPage.module.css';
import { Link } from 'react-router-dom';

/**
 * Displays a grid of all images in the given list of articles, along with links
 * to view the articles themselves.
 * 
 * Because the gallery page is down a different branch than the articles pages, I've used absolute paths
 * in the links here (i.e. starting with "/").
 */
export default function GalleryPage({ articles }) {
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