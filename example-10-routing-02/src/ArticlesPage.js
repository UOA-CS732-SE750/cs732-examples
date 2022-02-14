import { Outlet } from 'react-router-dom';
import ArticleSidebar from './ArticleSidebar';

export default function ArticlesPage({ articles }) {

    return (
        <>
            <aside>
                <ArticleSidebar articles={articles} />
            </aside>

            <main>
                <div className="box">
                    <Outlet />
                </div>
            </main>
        </>
    );
}