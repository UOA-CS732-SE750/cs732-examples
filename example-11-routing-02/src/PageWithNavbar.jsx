import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function PageWithNavbar() {
    return (
        <div className="container">
            <nav>
                <NavBar />
            </nav>

            <Outlet />
        </div>
    );
}