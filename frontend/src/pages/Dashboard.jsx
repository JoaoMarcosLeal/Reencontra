import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";

function Dashboard() {
  const items = [
    {
      id: 1,
      name: "Fone de ouvido JBL",
      type: "Perdido",
      location: "Próximo ao DAE",
      date: "12/11/2024",
      category: "Eletrônicos",
      icon: "🎧",
    },
    {
      id: 2,
      name: "Carteira de couro",
      type: "Encontrado",
      location: "Biblioteca Central",
      date: "10/11/2024",
      category: "Acessórios",
      icon: "👛",
    },
    {
      id: 3,
      name: "Garrafa de água",
      type: "Perdido",
      location: "Área de convivência",
      date: "09/11/2024",
      category: "Outros",
      icon: "💧",
    },
  ];

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