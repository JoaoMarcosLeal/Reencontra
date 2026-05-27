import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function carregarItens() {
      try {
        const response = await api.get("/items/");
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    carregarItens();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      filter === "todos"
        ? true
        : filter === "perdidos"
          ? item.is_found === false
          : item.is_found === true;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.location?.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-header">
          <div>
            <h1>Olá, Guilherme!</h1>
            <p>Veja os itens cadastrados pela comunidade.</p>
          </div>

          <Link className="primary-link" to="/novo-item">
            + Novo item
          </Link>
        </div>

        <div className="filters">
          <button onClick={() => setFilter("todos")}>Todos</button>
          <button onClick={() => setFilter("perdidos")}>Perdidos</button>
          <button onClick={() => setFilter("encontrados")}>Encontrados</button>
          <input
            placeholder="Buscar itens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <p>Nenhum item encontrado.</p>
          )}
        </section>
      </main>
    </>
  );
}

export default Dashboard;