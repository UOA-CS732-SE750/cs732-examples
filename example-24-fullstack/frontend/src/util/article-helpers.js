import { convertFromRaw } from 'draft-js';

function getPlaintextSummary(article, len = 50) {
    try {
        const contentState = convertFromRaw(JSON.parse(article.content));
        contentState.getPlainText();
        return `${contentState.getPlainText().substring(0, len)}...`;
    }
    catch (error) {
        return `${article.content.substring(0, len)}...`;
    }
}

export {
    getPlaintextSummary
}