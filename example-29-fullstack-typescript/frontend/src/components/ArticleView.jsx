import { Typography } from "@mui/material";
import { getImagePath } from "../util/image-path-utils";
import Main from "./Main";

/**
 * A simple React component which renders the title, image, and content of an article.
 */
export default function ArticleView({ article }) {
  if (article) {
    return (
      <Main image={getImagePath(article.image)} title={article.title}>
        <Typography paragraph>{article.content}</Typography>
      </Main>
    );
  } else {
    return <Main title="The article you requested does not exist 😥" />;
  }
}
