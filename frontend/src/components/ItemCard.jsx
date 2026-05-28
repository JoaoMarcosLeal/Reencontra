import {
  Laptop,
  FileText,
  KeyRound,
  Briefcase,
  Package,
  MapPin,
  Tag,
} from "lucide-react";

function ItemCard({ item }) {
  const isFound = item.is_found === true;

  const categoryIcons = {
    Eletrônicos: <Laptop size={28} />,
    Documentos: <FileText size={28} />,
    Chaves: <KeyRound size={28} />,
    Acessórios: <Briefcase size={28} />,
    Outros: <Package size={28} />,
  };

  return (
    <article className="item-card">
      <div className="item-card-header">
        <div className="item-icon">
          {categoryIcons[item.category] || <Package size={28} />}
        </div>

        <span className={!isFound ? "badge lost" : "badge found"}>
          {!isFound ? "PERDIDO" : "ENCONTRADO"}
        </span>
      </div>

      <h3>{item.title}</h3>

      <p className="item-description">{item.description}</p>

      <div className="item-info">
        <p>
          <MapPin size={16} />
          {item.location}
        </p>

        <p>
          <Tag size={16} />
          {item.category}
        </p>
      </div>
    </article>
  );
}

export default ItemCard;