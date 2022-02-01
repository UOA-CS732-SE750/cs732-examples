import { Outlet } from 'react-router-dom';
import ArticleSidebar from './ArticleSidebar';

export default function ArticlesPage() {

    return (
        <>
            <aside>
                <ArticleSidebar />
            </aside>

            <main>
                <div className="box">
                    <Outlet />
                </div>
            </main>
        </>
    );
}