import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CreateItem() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [isFound, setIsFound] = useState(false);

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            await api.post("/items/", null, {
                params: {
                    title,
                    description,
                    category,
                    location,
                    is_found: isFound,
                    owner_id: 1,
                },
            });

            setSuccessMessage("Item cadastrado com sucesso!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao cadastrar item. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />

            <main className="form-container">
                <h1>Cadastrar Item</h1>

                <form className="item-form" onSubmit={handleSubmit}>
                    <label>Título</label>
                    <input
                        type="text"
                        placeholder="Ex: Chave do carro"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Descrição</label>
                    <textarea
                        placeholder="Descreva o item..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label>Categoria</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Documentos">Documentos</option>
                        <option value="Chaves">Chaves</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Outros">Outros</option>
                    </select>

                    <label>Localização</label>
                    <input
                        type="text"
                        placeholder="Ex: Biblioteca Central"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                    <label>Tipo</label>
                    <select
                        value={isFound}
                        onChange={(e) => setIsFound(e.target.value === "true")}
                    >
                        <option value="false">Perdido</option>
                        <option value="true">Encontrado</option>
                    </select>

                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" disabled={loading}>
                        {loading? "Cadastrando...": "Cadastrar Item"}
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateItem;