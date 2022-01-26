import { makeStyles, Typography } from '@material-ui/core';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
    image: {
        float: 'left',
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        border: '1px solid rgb(200, 200, 200)'
    },
    paragraph: {
        textAlign: 'justify'
    }
}));

/**
 * A simple React component which renders the title, image, and content of an article.
 */
export default function ArticleView({ article }) {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h2" component="h2" gutterBottom>{article.title}</Typography>
            <img className={classes.image} src={article.image} />
            <Typography paragraph className={classes.paragraph}>{article.content}</Typography>
        </>
    );
}