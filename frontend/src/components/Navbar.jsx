import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <h2>REENCONTRA - UFLA</h2>

      <nav>
        <Link to="/dashboard">Início</Link>
        <Link to="/novo-item">Novo item</Link>
        <Link to="/">Sair</Link>
      </nav>
    </header>
  );
}

export default Navbar;