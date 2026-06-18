import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
  ArrowLeft,
  MapPin,
  Tag,
  Package,
  CheckCircle,
  AlertCircle,
  User,
  PhoneCall,
  Calendar,
} from "lucide-react";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarItem() {
      try {
        setLoading(true);

        const response = await api.get(`/items/${id}`);

        setItem(response.data);
        console.log(response.data);

        setError("");
      } catch (error) {
        console.log(error);

        if (error.response?.status === 404) {
          setError("Item não encontrado.");
        } else {
          setError("Erro ao carregar o item.");
        }
      } finally {
        setLoading(false);
      }
    }

    carregarItem();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="item-details-page">
          <div className="loading-details">
            <div className="spinner"></div>
            <p>Carregando informações...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <main className="item-details-page">
          <div className="error-card">
            <h2>{error}</h2>

            <button
              className="primary-button"
              onClick={() => navigate("/dashboard")}
            >
              Voltar ao Dashboard
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="item-details-page">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <section className="details-card">

          <div className="details-header">

            <div>

              <span className="details-category">

                <Tag size={15} />

                {item.category}

              </span>

              <h1>{item.title}</h1>

            </div>

            <span
              className={
                item.is_found
                  ? "status found"
                  : "status lost"
              }
            >
              {item.is_found ? (
                <>
                  <CheckCircle size={16} />
                  Encontrado
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  Perdido
                </>
              )}
            </span>

          </div>

          <div className="details-grid">

            <div className="detail-box">

              <MapPin size={22} />

              <div>

                <strong>Local</strong>

                <p>{item.location}</p>

              </div>

            </div>

            <div className="detail-box">

              <Package size={22} />

              <div>

                <strong>Categoria</strong>

                <p>{item.category}</p>

              </div>

            </div>

          </div>

          <section className="contact-card">

            <div className="contact-header">
              <PhoneCall size={22} />
              <h2>Contato</h2>
            </div>

            <p className="contact-owner">
              <strong>{item.owner.name}</strong>
            </p>

            <p className="contact-info">
              {item.contact}
            </p>

          </section>

          <section className="date-card">

            <Calendar size={18} />

            <span>
              Cadastrado em{" "}
              {new Date(item.created_at).toLocaleDateString("pt-BR")}
            </span>

          </section>

          <section className="description-card">

            <h2>Descrição</h2>

            <p>{item.description}</p>

          </section>

          <div className="details-actions">

            <button
              className="primary-button"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

          </div>

        </section>

      </main>
    </>
  );
}

export default ItemDetails;