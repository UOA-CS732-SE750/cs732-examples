import { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import FeaturedArticles from '../components/FeaturedArticles';
import Main from '../components/Main';

export default function ArticlesSummaryPage() {
    const { articles, articlesLoading } = useContext(AppContext);

    if (articlesLoading) {
        return null;
    }
    else {
        return (
            <Main title="Check out these amazing articles!">
                <FeaturedArticles articles={articles} />
            </Main>
        );
    }
}