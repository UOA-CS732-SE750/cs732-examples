import { Card, CardActionArea, CardContent, CardMedia, Hidden, Typography } from "@mui/material";
import { ArticleType } from "common";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getPlaintextSummary } from "../util/article-helpers";
import { getImagePath } from "../util/image-path-utils";

function SmallFeaturedArticle({ article }: { article: ArticleType | null }) {
  if (!article) {
    return null;
  }

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
        {/* Don't do this usually - I'm suppressing the deprecation warning to keep this code similar to the Fullstack example */}
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}{" "}
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

export default SmallFeaturedArticle;
