import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getPlaintextSummary } from '../util/article-helpers';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
    cardMedia: {
        width: '100%',
        height: 250,
        objectFit: 'cover',
        objectPosition: 'center'
    },
}));

/**
 * Displays Material UI Card containing info about the given article.
 */
export default function GalleryCard({ article }) {

    const classes = useStyles();

    return (
        <CardActionArea component={Link} to={`/articles/${article._id}`}>
            <Card>
                <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={article.image}
                    title={article.title} />
                <CardContent>
                    <Typography variant="h5" component="h2">{article.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {getPlaintextSummary(article)}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Continue reading...
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
}