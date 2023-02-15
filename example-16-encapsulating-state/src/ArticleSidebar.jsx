import { Link, NavLink } from 'react-router-dom';
import styles from './ArticleSidebar.module.css';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';

export default function ArticleSidebar() {

    const { articles } = useContext(AppContext);

    return (
        <div className={styles.navBar}>
            <h1>Articles</h1>
            {articles.map(article =>
                <NavLink key={article.id} to={`${article.id}`} className={({ isActive }) => isActive ? styles.active : undefined}>
                    {article.title}
                </NavLink>)}

            <hr />

            <Link to="newArticle" className={styles.addNew}>New article</Link>
        </div>
    );
}