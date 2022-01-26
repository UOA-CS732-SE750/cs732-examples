import dayjs from 'dayjs';
import { Article } from './schema';

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

    const dbArticle = await Article.findById(article._id);
    if (dbArticle) {

        dbArticle.title = article.title;
        dbArticle.date = dayjs(article.date).toDate();
        dbArticle.content = article.content;
        dbArticle.image = article.image;

        await dbArticle.save();
        return true;
    }

    return false;
}

async function deleteArticle(id) {
    await Article.deleteOne({ _id: id });
}

export {
    createArticle,
    retrieveArticle,
    retrieveArticleList,
    updateArticle,
    deleteArticle
}