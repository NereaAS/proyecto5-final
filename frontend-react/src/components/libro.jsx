export default function Libro({ titulo, precio, imagen }) {
  return (
    <div className="card-libro">
      <img className="card-libro__img" src={imagen} alt={titulo} />

      <h3 className="card-libro__titulo">{titulo}</h3>
      <p className="card-libro__precio">{precio} €</p>
    </div>
  );
}