import { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import { Grid } from '@material-ui/core';
import GalleryCard from '../components/GalleryCard';
import Main from '../components/Main';

/**
 * Displays a grid with a GalleryCard for each article.
 */
export default function GalleryPage() {

    const { articles } = useContext(AppContext);

    return (
        <Main title="The most galleriffic view!">
            <Grid container spacing={3}>
                {articles.map(article => (
                    <Grid key={article._id} item xs={6} md={4}>
                        <GalleryCard article={article} />
                    </Grid>
                ))}
            </Grid>
        </Main>
    );
}