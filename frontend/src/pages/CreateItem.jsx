import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
  Package,
  MapPin,
  Tag,
  FileText,
  CircleHelp,
  ArrowLeft,
  Plus,
  PhoneCall,
} from "lucide-react";

function CreateItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
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
      await api.post("/items/", {
        title,
        description,
        category,
        location,
        is_found: isFound,
        contact,
      });

      setSuccessMessage("Item cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error(error);

      console.log(
        "Resposta do backend:",
        error.response?.data
      );

      setErrorMessage("Erro ao cadastrar item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="create-container">

        <section className="create-banner">

          <div>

            <span>NOVO CADASTRO</span>

            <h1>Cadastre um objeto</h1>

            <p>
              Ajude a comunidade da UFLA registrando um item perdido ou
              encontrado.
            </p>

          </div>

        </section>

        <div className="create-layout">

          <section className="create-card">

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    <Package size={18} />
                    Título
                  </label>

                  <input
                    type="text"
                    placeholder="Ex.: Notebook Dell"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    <Tag size={18} />
                    Tipo
                  </label>

                  <select
                    value={isFound}
                    onChange={(e) => setIsFound(e.target.value === "true")}
                  >
                    <option value="false">
                      Perdido
                    </option>

                    <option value="true">
                      Encontrado
                    </option>

                  </select>

                </div>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    <Tag size={18} />
                    Categoria
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">
                      Selecione...
                    </option>

                    <option>
                      Eletrônicos
                    </option>

                    <option>
                      Documentos
                    </option>

                    <option>
                      Chaves
                    </option>

                    <option>
                      Acessórios
                    </option>

                    <option>
                      Outros
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    <MapPin size={18} />
                    Local
                  </label>

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Biblioteca Central"
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  <FileText size={18} />
                  Descrição
                </label>

                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva cor, marca, tamanho e qualquer característica importante."
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <PhoneCall size={18} />
                  Contato
                </label>

                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Instagram - @XXXXXX // Whtasapp - (99) 9 9999-9999 // ..."
                  required
                />

              </div>

              {successMessage &&
                <div className="success-box">
                  {successMessage}
                </div>
              }

              {errorMessage &&
                <div className="error-box">
                  {errorMessage}
                </div>
              }

              <div className="buttons">

                <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
                  <ArrowLeft size={18} />
                  Voltar
                </button>

                <button type="submit" className="save-button" disabled={loading}>
                  <Plus size={18} />
                  {loading ? "Salvando..." : "Cadastrar Item"}
                </button>
              </div>
            </form>
          </section>

          <aside className="tips-card">
            <CircleHelp size={34} />
            <h3>Dicas</h3>

            <ul>
              <li>
                Informe o local exato.
              </li>
              <li>
                Descreva cores e marca.
              </li>
              <li>
                Evite títulos muito grandes.
              </li>
              <li>
                Quanto mais detalhes, maiores as chances do item ser encontrado.
              </li>
            </ul>

          </aside>
        </div>
      </main>
    </>
  );
}

export default CreateItem;