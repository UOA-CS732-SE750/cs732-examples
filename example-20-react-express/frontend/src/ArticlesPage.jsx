import ArticleSidebar from "./ArticleSidebar";
import { Outlet } from "react-router-dom";

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
