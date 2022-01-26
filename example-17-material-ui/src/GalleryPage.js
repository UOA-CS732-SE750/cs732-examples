import { makeStyles, Toolbar } from '@material-ui/core';
import GalleryCard from './GalleryCard';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
    galleryRoot: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    cardContainer: {
        display: 'grid',
        gap: theme.spacing(2),
        gridAutoRows: '1fr',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyItems: 'stretch'
    }
}));

/**
 * Displays a grid with a GalleryCard for each article.
 */
export default function GalleryPage({ articles }) {

    const classes = useStyles();

    return (
        <main className={classes.galleryRoot}>
            <Toolbar variant="dense" />
            <div className={classes.cardContainer}>
                {articles.map(article => <GalleryCard article={article} />)}
            </div>
        </main>
    );
}