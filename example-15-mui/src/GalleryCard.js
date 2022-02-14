import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Displays MUI Card containing info about the given article.
 */
export default function GalleryCard({ article }) {

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={article.image} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                </Typography>
                <ShortContent content={article.content} />
            </CardContent>

            <CardActions>
                <Button size="small" component={Link} to={`/articles/${article.id}`}>View Article</Button>
            </CardActions>
        </Card>
    );
}

/**
 * Renders a single Typography containing truncated article content - Essentially, the first few words in the article followed by "...".
 */
function ShortContent({ content }) {
    let text = content;
    if (typeof content !== 'string') {
        text = content[0];
    }
    return (
        <Typography variant="body2" color="text.secondary">
            {text.substr(0, 50)}
            ...
        </Typography>
    );
}