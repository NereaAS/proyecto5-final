import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001/api/proyecto5/react";
const VENTAS_URL = "http://localhost:3001/api/proyecto5/ventas";

export default function Inicio() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [comprandoId, setComprandoId] = useState(null);

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

  const comprar = (producto) => {
    if (!producto) return;

    setComprandoId(producto.id);

    fetch(VENTAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comprador: "Nerea Alba Sanz",
        origen: "react",
        producto: {
          id: producto.id,
          titulo: producto.titulo,
          autor: producto.autor,
          precio: producto.precio,
        },
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error al registrar la compra");
        return r.json();
      })
      .then(() => {
        setMensaje(`Compra registrada ✅ (${producto.titulo})`);
        setTimeout(() => setMensaje(""), 2500);
      })
      .catch(() => {
        setMensaje("No se pudo registrar la compra ❌");
        setTimeout(() => setMensaje(""), 2500);
      })
      .finally(() => setComprandoId(null));
  };

  if (cargando) return <main><h2>Cargando catálogo...</h2></main>;
  if (error) return <main><h2>Error: {error}</h2></main>;

  return (
    <main>
      <h1>Libros</h1>

      {mensaje && <p>{mensaje}</p>}

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
                onClick={() => comprar(libro)}
                disabled={comprandoId === libro.id}
                aria-busy={comprandoId === libro.id}
                title="Registrar compra"
              >
                {comprandoId === libro.id ? "Comprando..." : "Comprar"}
              </button>
            </div>

            <div className="envio">Envío gratis</div>
          </div>
        ))}
      </div>
    </main>
  );
}