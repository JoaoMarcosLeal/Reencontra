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
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Você precisa estar logado para cadastrar um item.");
        setLoading(false);
        return;
      }

      await api.post(
        "/items/",
        {
          title: title,
          description: description,
          category: category,
          location: location,
          is_found: isFound,
          owner_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccessMessage("Item cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setErrorMessage("Sessão expirada ou inválida. Faça login novamente.");
      } else {
        setErrorMessage("Erro ao cadastrar item. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="create-item-page">
        <section className="create-item-header">
          <h1>Cadastrar novo item</h1>
          <p>
            Informe os dados do objeto perdido ou encontrado para ajudar a
            comunidade da UFLA.
          </p>
        </section>

        <section className="create-item-card">
          <form className="item-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Ex: Chave do carro"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={isFound}
                  onChange={(e) => setIsFound(e.target.value === "true")}
                >
                  <option value="false">Perdido</option>
                  <option value="true">Encontrado</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Documentos">Documentos</option>
                <option value="Chaves">Chaves</option>
                <option value="Acessórios">Acessórios</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Localização</label>
              <input
                type="text"
                placeholder="Ex: Biblioteca Universitária"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                placeholder="Descreva o item com detalhes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </button>

              <button type="submit" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar item"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateItem;
