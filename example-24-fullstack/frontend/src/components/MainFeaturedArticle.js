import * as React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, Link as MuiLink, Box } from '@mui/material';
import { Link as RRLink } from 'react-router-dom';
import { getPlaintextSummary } from '../util/article-helpers';

function MainFeaturedArticle({ article }) {

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: (theme) => theme.palette.grey[800],
                color: (theme) => theme.palette.common.white,
                marginBottom: (theme) => theme.spacing(4),
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            style={{ backgroundImage: `url(${article.image})` }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={article.image} alt={article.title} />}

            <Box sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
            }} />
            <Grid container>
                <Grid item md={8}>
                    <Box sx={(theme) => ({
                        position: 'relative',
                        padding: theme.spacing(3),
                        [theme.breakpoints.up('md')]: {
                            padding: theme.spacing(6),
                            paddingRight: 0,
                        },
                    })}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {article.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {getPlaintextSummary(article, 100)}
                        </Typography>
                        <MuiLink variant="subtitle1" component={RRLink} to={`/articles/${article._id}`}>
                            Continue reading...
                        </MuiLink>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedArticle.propTypes = {
    article: PropTypes.shape({
        date: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default MainFeaturedArticle;
