import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  return (
    <header className="navbar">
      <h2>REENCONTRA - UFLA</h2>

      <nav>
        <Link to="/dashboard">Início</Link>
        <Link to="/novo-item">Novo item</Link>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </header>
  );
}

export default Navbar;