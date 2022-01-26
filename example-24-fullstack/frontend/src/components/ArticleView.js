import { makeStyles, Typography } from '@material-ui/core';
import Main from './Main';
import MUIRichTextEditor from 'mui-rte';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
    paragraph: {
        // textAlign: 'justify'
    }
}));

/**
 * A simple React component which renders the title, image, and content of an article.
 */
export default function ArticleView({ article }) {
    const classes = useStyles();
    if (article) {

        // Try to parse content as JSON. If it is, then we'll display it in the rich text editor.
        // Otherwise we'll display it as plaintext.
        let isJson = false;
        try {
            JSON.parse(article.content);
            isJson = true;
        } catch { }

        return (
            <Main image={article.image} title={article.title}>
                {isJson ? (
                    <MUIRichTextEditor defaultValue={article.content} readOnly toolbar={false} />
                ) : (
                    <Typography paragraph className={classes.paragraph}>{article.content}</Typography>
                )}
            </Main>
        );
    }
    else {
        return (
            <Main title="The article you requested does not exist 😥" />
        );
    }
}