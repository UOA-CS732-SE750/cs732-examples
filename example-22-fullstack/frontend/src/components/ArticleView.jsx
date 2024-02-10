import { Typography } from "@mui/material";
import Main from "./Main";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

/**
 * A simple React component which renders the title, image, and content of an article.
 */
export default function ArticleView({ article }) {
  if (article) {
    return (
      <Main image={IMAGE_BASE_URL + article.image} title={article.title}>
        <Typography paragraph>{article.content}</Typography>
      </Main>
    );
  } else {
    return <Main title="The article you requested does not exist 😥" />;
  }
}
