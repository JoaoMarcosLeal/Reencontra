import {
  Laptop,
  FileText,
  KeyRound,
  Briefcase,
  Package,
  MapPin,
  Tag,
  ArrowRight,
  Circle,
} from "lucide-react";

import { Link } from "react-router-dom";

function ItemCard({ item }) {
  const isFound = item.is_found;

  const categoryIcons = {
    Eletrônicos: <Laptop size={28} />,
    Documentos: <FileText size={28} />,
    Chaves: <KeyRound size={28} />,
    Acessórios: <Briefcase size={28} />,
    Outros: <Package size={28} />,
  };

  return (
    <Link
      to={`/item/${item.id}`}
      className="item-card-link"
    >
      <article className="item-card">

        <div className="card-header">

          <div className="item-icon">

            {categoryIcons[item.category] || <Package size={28} />}

          </div>

          <span
            className={`badge ${isFound ? "found" : "lost"}`}
          >
            <Circle
              size={8}
              fill="currentColor"
            />

            {isFound
              ? "Encontrado"
              : "Perdido"}

          </span>

        </div>

        <div className="card-body">

          <h3>{item.title}</h3>

          <p className="item-description">
            {item.description}
          </p>

        </div>

        <div className="item-info">

          <div className="info-chip">

            <MapPin size={15} />

            {item.location}

          </div>

          <div className="info-chip">

            <Tag size={15} />

            {item.category}

          </div>

        </div>

        <div className="card-footer">

          <span className="details-text">

            Ver detalhes

          </span>

          <ArrowRight
            size={18}
            className="details-arrow"
          />

        </div>

      </article>
    </Link>
  );
}

export default ItemCard;