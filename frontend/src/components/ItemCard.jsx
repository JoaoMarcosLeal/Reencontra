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

function ItemCard({ item }) {
  const isFound = item.is_found === true;

  const categoryIcons = {
    Eletrônicos: <Laptop size={30} />,
    Documentos: <FileText size={30} />,
    Chaves: <KeyRound size={30} />,
    Acessórios: <Briefcase size={30} />,
    Outros: <Package size={30} />,
  };

  return (
    <article className="item-card">

      <div className="card-header">

        <div className="item-icon">
          {categoryIcons[item.category] || <Package size={30} />}
        </div>

        <span className={isFound ? "badge found" : "badge lost"}>
          <Circle size={10} fill="currentColor" />
          {isFound ? "Encontrado" : "Perdido"}
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
          <MapPin size={15}/>
          {item.location}
        </div>

        <div className="info-chip">
          <Tag size={15}/>
          {item.category}
        </div>

      </div>

      <button className="details-button">

        Ver detalhes

        <ArrowRight size={18}/>

      </button>

    </article>
  );
}

export default ItemCard;