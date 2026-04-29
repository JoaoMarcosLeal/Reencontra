import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <section className="auth-illustration">
        <h1>REENCONTRA - UFLA</h1>
        <p>Conectando pessoas a seus objetos perdidos no campus.</p>
      </section>

      <section className="auth-card">
        <h2>Entrar na sua conta</h2>

        <form onSubmit={handleLogin}>
          <label>E-mail</label>
          <input type="email" placeholder="seu@email.com" required />

          <label>Senha</label>
          <input type="password" placeholder="Sua senha" required />

          <button type="submit">Entrar</button>
        </form>

        <p>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;