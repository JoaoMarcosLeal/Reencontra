import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("todos");

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
    if (filter === "perdidos") {
      return item.is_found === false;
    }

    if (filter === "encontrados") {
      return item.is_found === true;
    }

    return true;
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
          <input placeholder="Buscar itens..." />
        </div>

        <section className="grid">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </section>
      </main>
    </>
  );
}

export default Dashboard;