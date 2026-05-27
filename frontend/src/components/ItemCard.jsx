function ItemCard({ item }) {
  return (
    <article className="item-card">
      <div className="item-image">{item.icon}</div>

      <div>
        <span className={!item.is_found ? "badge lost" : "badge found"}>
          {!item.is_found ? "PERDIDO" : "ENCONTRADO"}
        </span>

        <h3>{item.title}</h3>
        <p>{item.location}</p>
        <p>{item.description}</p>
        <small>{item.category}</small>
      </div>
    </article>
  );
}

export default ItemCard;