import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import { useState, useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    async function  carregarItens() {
      try {
        const response = await api.get("/items/");
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    carregarItens();
  }, []);

  const [items, setItems] = useState([]);

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-header">
          <div>
            <h1>Olá, Guilherme!</h1>
            <p>Veja os itens cadastrados pela comunidade.</p>
          </div>

          <a className="primary-link" href="/novo-item">
            + Novo item
          </a>
        </div>

        <div className="filters">
          <button>Todos</button>
          <button>Perdidos</button>
          <button>Encontrados</button>
          <input placeholder="Buscar itens..." />
        </div>

        <section className="grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </section>
      </main>
    </>
  );
}

export default Dashboard;