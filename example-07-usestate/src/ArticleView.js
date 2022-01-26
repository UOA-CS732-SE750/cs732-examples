/**
 * A simple React component which renders the given article. An article is rendered as an
 * <h2> displaying its title, followed by a <p> containing its content.
 * 
 * Note that as shown here, we can write "export default.." on the same line as the function
 * definition.
 */
export default function ArticleView({ article }) {
    // The div below has a className defined which is referred to by the ".article" CSS selector in index.css.
    return (
        <div className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
        </div>
    );
}