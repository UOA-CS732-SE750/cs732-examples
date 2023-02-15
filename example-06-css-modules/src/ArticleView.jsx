import styles from './ArticleView.module.css'; // Import a CSS file as a CSS module

/**
 * A simple React component which renders the given article. An article is rendered as an
 * <h2> displaying its title, followed by a <p> containing its content.
 */
export default function ArticleView({ article }) {
    // The div below has a className defined which references the "article" CSS class selector defined
    // within the imported CSS module.
    return (
        <div className={styles.article}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
        </div>
    );
}