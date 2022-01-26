import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={article.image}
                    title={article.title} />
                <CardContent>
                    <Typography variant="h5" component="h2">{article.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {article.content.substr(0, 50)}
                                ...
                            </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/articles/${article.id}`}>
                    View Article
                </Button>
            </CardActions>
        </Card>
    );
}