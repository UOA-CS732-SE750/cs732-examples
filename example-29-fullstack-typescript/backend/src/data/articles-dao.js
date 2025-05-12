import { Article } from "./schema.js";

async function createArticle(article) {
  const dbArticle = new Article(article);
  await dbArticle.save();
  return dbArticle;
}

async function retrieveArticleList() {
  return await Article.find();
}

async function retrieveArticle(id) {
  return await Article.findById(id);
}

async function updateArticle(article) {
  const dbArticle = await Article.findOneAndUpdate(
    { _id: article._id },
    article
  );
  return dbArticle !== undefined;
}

async function deleteArticle(id) {
  await Article.deleteOne({ _id: id });
}

export {
  createArticle,
  retrieveArticle,
  retrieveArticleList,
  updateArticle,
  deleteArticle,
};
