import { Grid } from "@mui/material";
import { ArticleType } from "common";
import MainFeaturedArticle from "./MainFeaturedArticle";
import SmallFeaturedArticle from "./SmallFeaturedArticle";

export default function FeaturedArticles({ articles }: { articles: ArticleType[] }) {
  if (!articles[0]) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* TypeScript non-null assertion using '!' since we check length above */}
        <MainFeaturedArticle article={articles[0]} />
      </Grid>
      {articles.length >= 2 && (
        <Grid item xs={12} md={6}>
          <SmallFeaturedArticle article={articles[1] ?? null} />
        </Grid>
      )}
      {articles.length >= 3 && (
        <Grid item xs={12} md={6}>
          <SmallFeaturedArticle article={articles[2] ?? null} />
        </Grid>
      )}
    </Grid>
  );
}
