import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getPlaintextSummary } from '../util/article-helpers';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

function SmallFeaturedArticle({ article }) {
    const classes = useStyles();

    return (
        <CardActionArea component={Link} to={`/articles/${article._id}`}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            {article.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {dayjs(article.date).format('dddd, MMMM D, YYYY h:mm A')}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {getPlaintextSummary(article)}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <CardMedia
                        className={classes.cardMedia}
                        image={article.image}
                        title={article.title}
                    />
                </Hidden>
            </Card>
        </CardActionArea>
    );
}

SmallFeaturedArticle.propTypes = {
    article: PropTypes.shape({
        date: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default SmallFeaturedArticle;