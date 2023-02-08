import { NavLink } from 'react-router-dom';
import styles from './ArticleNavBar.module.css';

export default function ArticleNavBar({ articles }) {

    return (
        <div className={styles.navBar}>
            {articles.map(article =>
                <NavLink key={article.id} to={`/articles/${article.id}`}
                    className={({ isActive }) => isActive ? styles.active: undefined}>
                    {article.title}
                </NavLink>)}
        </div>
    );
}