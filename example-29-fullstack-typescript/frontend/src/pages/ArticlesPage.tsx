import { Routes, Route } from "react-router-dom";
import SingleArticlePage from "./SingleArticlePage";
import ArticlesSummaryPage from "./ArticlesSummaryPage";

export default function ArticlesPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArticlesSummaryPage />} />
        <Route path=":id" element={<SingleArticlePage />} />
      </Routes>
    </>
  );
}
