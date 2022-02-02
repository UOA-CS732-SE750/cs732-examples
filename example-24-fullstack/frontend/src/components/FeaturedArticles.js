import { Grid } from '@mui/material';
import SmallFeaturedArticle from './SmallFeaturedArticle';
import MainFeaturedArticle from './MainFeaturedArticle';

export default function FeaturedArticles({ articles }) {

    if (!(articles && articles.length > 0)) {
        return null;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MainFeaturedArticle article={articles[0]} />
            </Grid>
            {articles.length >= 2 && <Grid item xs={12} md={6}>
                <SmallFeaturedArticle article={articles[1]} />
            </Grid>}
            {articles.length >= 3 && <Grid item xs={12} md={6}>
                <SmallFeaturedArticle article={articles[2]} />
            </Grid>}
        </Grid>
    );
}