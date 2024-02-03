import { Outlet, Route, Routes } from "react-router-dom";

export default function ComponentWithRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route path="home" element={<p>Homepage</p>} />

        <Route path="about" element={<p>About me!</p>} />
      </Route>
    </Routes>
  );
}

function Page() {
  return (
    <div>
      <h1>App title</h1>
      <Outlet />
    </div>
  );
}
