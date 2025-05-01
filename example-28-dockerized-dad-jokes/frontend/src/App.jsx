import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";

function App() {
  return (
    <>
      <NavBar />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
