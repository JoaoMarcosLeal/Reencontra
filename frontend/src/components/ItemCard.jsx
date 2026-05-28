function ItemCard({ item }) {
  return (
    <article className="item-card">
      <div className="item-image">{item.icon}</div>

      <div>
        <span className={item.type === "Perdido" ? "badge lost" : "badge found"}>
          {item.type}
        </span>

        <h3>{item.name}</h3>
        <p>{item.location}</p>
        <p>{item.date}</p>
        <small>{item.category}</small>
      </div>
    </article>
  );
}

export default ItemCard;