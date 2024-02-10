import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getPlaintextSummary } from "../util/article-helpers";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

/**
 * Displays Material UI Card containing info about the given article.
 */
export default function GalleryCard({ article }) {
  return (
    <CardActionArea component={Link} to={`/articles/${article._id}`}>
      <Card>
        <CardMedia
          sx={{
            width: "100%",
            height: 250,
            objectFit: "cover",
            objectPosition: "center"
          }}
          component="img"
          image={IMAGE_BASE_URL + article.image}
          title={article.title}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getPlaintextSummary(article)}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
