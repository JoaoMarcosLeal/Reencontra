import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    alert("Conta criada com sucesso!");
    navigate("/");
  }

  return (
    <main className="auth-page">
      <section className="auth-illustration">
        <h1>REENCONTRA - UFLA</h1>
        <p>Crie sua conta para cadastrar e encontrar objetos.</p>
      </section>

      <section className="auth-card">
        <h2>Criar conta</h2>

        <form onSubmit={handleRegister}>
          <label>Nome completo</label>
          <input type="text" placeholder="Seu nome" required />

          <label>E-mail</label>
          <input type="email" placeholder="seu@email.com" required />

          <label>Senha</label>
          <input type="password" placeholder="Mínimo 6 caracteres" required />

          <button type="submit">Cadastrar</button>
        </form>

        <p>
          Já tem uma conta? <Link to="/">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;