import { Link, NavLink } from 'react-router-dom';
import styles from './ArticleSidebar.module.css';

export default function ArticleSidebar({ articles }) {

    /**
     * In the below code, we're adding a bunch of nav links to the sidebar, linking to just "<id>", where <id> is just an article's id.
     * Because the links don't start with "/", they are relative to where this ArticleSidebar component sits in the hierarchy.
     * 
     * Note that the "to" prop of <Link>s and <NavLink>s expects a string value. Therefore we can't pass the article id directly, because
     * it's a number. That's why we're wrapping it in a template literal. We could also use article.id.toString().
     */
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