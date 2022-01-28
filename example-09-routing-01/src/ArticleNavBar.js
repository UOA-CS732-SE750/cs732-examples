import { NavLink } from 'react-router-dom';
import styles from './ArticleNavBar.module.css';

export default function ArticleNavBar({ articles }) {

    return (
        <div className={styles.navBar}>
            {articles.map(article =>
                <NavLink to={`/articles/${article.id}`}
                    className={({ isActive }) => isActive && styles.active}>
                    {article.title}
                </NavLink>)}
        </div>
    );
}