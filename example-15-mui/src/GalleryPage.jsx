import { Box, Grid, Toolbar, Typography } from '@mui/material';
import GalleryCard from './GalleryCard';

/**
 * Displays a grid with a GalleryCard for each article.
 */
export default function GalleryPage({ articles }) {

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />

            <Typography variant="h2" component="h2" gutterBottom>Articles Gallery</Typography>

            <Grid container spacing={2}>
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} lg={3}>
                        <GalleryCard article={article} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}