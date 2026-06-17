import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  PackageSearch,
  CircleAlert,
} from "lucide-react";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function carregarItens() {
      try {
        setLoading(true);

        await delay(1000);

        const response = await api.get("/items/");

        setItems(response.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError("Não foi possível carregar os itens.");
      } finally {
        setLoading(false);
      }
    }

    carregarItens();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      filter === "todos"
        ? true
        : filter === "perdidos"
        ? !item.is_found
        : item.is_found;

    const text = search.toLowerCase();

    const matchesSearch =
      item.title?.toLowerCase().includes(text) ||
      item.description?.toLowerCase().includes(text) ||
      item.category?.toLowerCase().includes(text) ||
      item.location?.toLowerCase().includes(text);

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="dashboard-container">

        {/* Header */}

        <section className="dashboard-header">

          <div className="dashboard-title">

            <span>Dashboard</span>

            <h1>
              Encontre objetos perdidos na UFLA
            </h1>

            <p>
              Consulte os itens cadastrados pela comunidade ou registre um novo
              objeto encontrado.
            </p>

          </div>

          <Link to="/novo-item" className="new-item-button">
            <Plus size={20} />
            Novo Item
          </Link>

        </section>

        {/* Banner */}

        <section className="dashboard-banner">

          <PackageSearch size={30} />

          <div>

            <h3>
              Ajude alguém a recuperar um objeto perdido
            </h3>

            <p>
              Quanto mais informações forem cadastradas, maiores são as chances
              de encontrar o verdadeiro dono.
            </p>

          </div>

        </section>

        {/* Pesquisa */}

        <section className="search-area">

          <div className="search-box">

            <Search size={20} />

            <input
              type="text"
              placeholder="Buscar por nome, categoria ou localização..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </section>

        {/* Filtros */}

        <section className="tabs">

          <button
            className={filter === "todos" ? "active" : ""}
            onClick={() => setFilter("todos")}
          >
            Todos
          </button>

          <button
            className={filter === "perdidos" ? "active" : ""}
            onClick={() => setFilter("perdidos")}
          >
            Perdidos
          </button>

          <button
            className={filter === "encontrados" ? "active" : ""}
            onClick={() => setFilter("encontrados")}
          >
            Encontrados
          </button>

        </section>

        {/* Quantidade */}

        {!loading && !error && (
          <div className="results-info">

            <strong>{filteredItems.length}</strong>{" "}
            {filteredItems.length === 1
              ? "item encontrado"
              : "itens encontrados"}

          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="loading-container">

            <div className="spinner"></div>

            <p>Carregando objetos...</p>

          </div>
        )}

        {/* Erro */}

        {error && (
          <div className="dashboard-error">

            <CircleAlert size={24} />

            <p>{error}</p>

          </div>
        )}

        {/* Lista */}

        {!loading && !error && (

          <section className="grid">

            {filteredItems.length > 0 ? (

              filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                />
              ))

            ) : (

              <div className="empty-state">

                <PackageSearch size={70} />

                <h2>
                  Nenhum item encontrado
                </h2>

                <p>
                  Não encontramos objetos para os filtros selecionados.
                </p>

                <Link
                  className="new-item-button"
                  to="/novo-item"
                >
                  <Plus size={18} />
                  Cadastrar novo item
                </Link>

              </div>

            )}

          </section>

        )}

      </main>
    </>
  );
}

export default Dashboard;