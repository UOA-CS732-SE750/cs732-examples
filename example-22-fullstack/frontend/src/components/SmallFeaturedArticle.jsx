import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Hidden } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getPlaintextSummary } from '../util/article-helpers';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? '';

function SmallFeaturedArticle({ article }) {

    return (
        <CardActionArea component={Link} to={`/articles/${article._id}`}>
            <Card>
                <CardContent sx={{ flex: 1 }}>
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
                <Hidden smDown>
                    <CardMedia sx={{ height: 80 }}
                        image={IMAGE_BASE_URL + article.image}
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