import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, PlusCircle, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="navbar">

      <Link to="/dashboard" className="logo">
        <div className="logo-circle">R</div>

        <div>
          <h2>Reencontra</h2>
          <span>Universidade Federal de Lavras</span>
        </div>
      </Link>

      <nav>

        <Link
          to="/dashboard"
          className={`nav-item ${location.pathname === "/dashboard" ? "active-link" : ""}`}
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          to="/novo-item"
          className={`nav-item ${location.pathname === "/novo-item" ? "active-link" : ""}`}
        >
          <PlusCircle size={18} />
          Novo Item
        </Link>

        <button
          className="nav-item"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Sair
        </button>

      </nav>

    </header>
  );
}

export default Navbar;