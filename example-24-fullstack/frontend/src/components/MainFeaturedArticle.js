import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as MuiLink } from '@material-ui/core';
import { Link as RRLink } from 'react-router-dom';
import { getPlaintextSummary } from '../util/article-helpers';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

function MainFeaturedArticle({ article }) {
    const classes = useStyles();

    return (
        <Paper
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${article.image})` }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={article.image} alt={article.title} />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={8}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {article.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {getPlaintextSummary(article, 100)}
                        </Typography>
                        <MuiLink variant="subtitle1" component={RRLink} to={`/articles/${article._id}`}>
                            Continue reading...
                        </MuiLink>
                    </div>
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
