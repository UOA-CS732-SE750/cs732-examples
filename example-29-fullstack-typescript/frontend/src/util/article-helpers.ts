import { ArticleType } from "common";

function getPlaintextSummary(article: ArticleType, len = 50) {
  if (article.content.length <= len) return article.content;
  return `${article.content.substring(0, len)}...`;
}

export { getPlaintextSummary };
