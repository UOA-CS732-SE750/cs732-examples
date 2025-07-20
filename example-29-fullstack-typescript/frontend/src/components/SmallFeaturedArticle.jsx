import { Card, CardActionArea, CardContent, CardMedia, Hidden, Typography } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPlaintextSummary } from "../util/article-helpers";
import { getImagePath } from "../util/image-path-utils";

function SmallFeaturedArticle({ article }) {
  return (
    <CardActionArea component={Link} to={`/articles/${article._id}`}>
      <Card>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {article.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {dayjs(article.date).format("dddd, MMMM D, YYYY h:mm A")}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {getPlaintextSummary(article)}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        <Hidden smDown>
          <CardMedia
            sx={{ height: 80 }}
            image={getImagePath(article.image)}
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
    title: PropTypes.string.isRequired
  }).isRequired
};

export default SmallFeaturedArticle;
