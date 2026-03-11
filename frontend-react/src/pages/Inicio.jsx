import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_URL = "http://localhost:3001/api/proyecto5/react";

export default function Inicio() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [añadiendoId, setAñadiendoId] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setCargando(true);
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar productos");
        return r.json();
      })
      .then((data) => setLibros(data))
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const añadirAlCarrito = (producto) => {
    if (!producto) return;
    setAñadiendoId(producto.id);
    addToCart({
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagen,
      autor: producto.autor,
    });
    setMensaje(`✅ Añadido al carrito (${producto.titulo})`);
    setTimeout(() => setMensaje(""), 2500);
    setAñadiendoId(null);
  };

  if (cargando) return <main><h2>Cargando catálogo...</h2></main>;
  if (error) return <main><h2>Error: {error}</h2></main>;

  return (
    <main>
      <h1>Libros</h1>

      {mensaje && <p style={{ background: "#d4edda", color: "#155724", padding: "0.5rem", borderRadius: "4px" }}>{mensaje}</p>}

      <div className="grid-libros">
        {libros.map((libro) => (
          <div key={libro.id} className="card-libro">
            <img src={libro.imagen} alt={libro.titulo} />
            <div className="formato">{libro.tapa}</div>

            <h3>{libro.titulo}</h3>
            <div className="autor">{libro.autor}</div>
            <div className="precio">{libro.precio} €</div>

            <div className="acciones">
              <Link to={`/productos/${libro.id}`}>Ver detalle</Link>
              <button
                onClick={() => añadirAlCarrito(libro)}
                disabled={añadiendoId === libro.id}
              >
                {añadiendoId === libro.id ? "Añadiendo..." : "🛒 Añadir al carrito"}
              </button>
            </div>

            <div className="envio">Envío gratis</div>
          </div>
        ))}
      </div>
    </main>
  );
}