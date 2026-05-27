function ItemCard({ item }) {
  return (
    <article className="item-card">
      <div className="item-image">{item.icon}</div>

      <div>
        <span className={item.is_found == false ? "badge lost" : "badge found"}>
          {item.is_found == false ? "PERDIDO" : "ENCONTRADO"}
        </span>

        <h3>{item.title}</h3>
        <p>{item.location}</p>
        <p>{item.category}</p>
        <small>{item.description}</small>
      </div>
    </article>
  );
}

export default ItemCard;