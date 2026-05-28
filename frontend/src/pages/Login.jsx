import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", null, {
                params: {
                    email,
                    password,
                },
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Erro ao fazer login");
            console.log(error);
        }
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
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Senha</label>
                    <input 
                        type="password" 
                        placeholder="Sua senha" 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

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