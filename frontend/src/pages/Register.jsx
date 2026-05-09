import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        
        try {
            await api.post("/users/register", null, {
                params: {
                    email,
                    password,
                },
            });

            alert("Conta criada com sucesso!");
            navigate("/");
        } catch (error) {
            alert("Erro ao cadastrar usuário");
            console.log(error);
        }
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
                    <input type="text" 
                    placeholder="Seu nome" 
                    onChange={(e) => setNome(e.target.value)}
                    required />

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