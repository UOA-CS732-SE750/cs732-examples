import { Box, Typography } from "@mui/material";

/**
 * A simple React component which renders the title, image, and content of an article.
 */
export default function ArticleView({ article }) {
  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        {article.title}
      </Typography>
      <Box
        component="img"
        src={article.image}
        sx={{
          float: "left",
          marginRight: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2)
        }}
      />
      <ArticleContent content={article.content} />
    </>
  );
}

/**
 * If the article's content is a string, renders a single Typography containing that string. Otherwise, the content should be an array
 * of strings, in which case we'll render an array of Typography objects.
 */
function ArticleContent({ content }) {
  if (typeof content === "string") {
    return (
      <Typography paragraph sx={{ textAlign: "justify" }}>
        {content}
      </Typography>
    );
  } else {
    return content.map((para, index) => (
      <Typography key={index} paragraph sx={{ textAlign: "justify" }}>
        {para}
      </Typography>
    ));
  }
}
