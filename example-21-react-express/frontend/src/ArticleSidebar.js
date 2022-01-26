import { useContext } from 'react';
import { Link, NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import styles from './ArticleSidebar.module.css';
import { AppContext } from './AppContextProvider';

export default function ArticleSidebar() {

    const { articles } = useContext(AppContext);
    const { url } = useRouteMatch();
    const { pathname } = useLocation();

    return (
        <div className={styles.navBar}>
            <h1>Articles</h1>
            {articles.map(article =>
                <NavLink key={article.id} to={`${url}/${article.id}`} activeClassName={styles.active}>
                    {article.title}
                </NavLink>)}

            {/* <hr /> */}

            {/* <Link to={`${pathname}/newArticle`} className={styles.addNew}>New article</Link> */}
        </div>
    );
}