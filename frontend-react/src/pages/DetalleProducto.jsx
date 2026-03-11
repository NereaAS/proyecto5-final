import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_URL = "http://localhost:3001/api/proyecto5/react";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setCargando(true);
    fetch(`${API_URL}/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Producto no encontrado");
        return r.json();
      })
      .then((data) => setProducto(data))
      .catch(() => setProducto(null))
      .finally(() => setCargando(false));
  }, [id]);

  const añadirAlCarrito = () => {
    if (!producto) return;
    addToCart({
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagen,
      autor: producto.autor,
    });
    setMensaje("✅ Añadido al carrito");
    setTimeout(() => setMensaje(""), 2500);
  };

  if (cargando) {
    return (
      <main style={{ padding: 16 }}>
        <h2>Cargando producto...</h2>
      </main>
    );
  }

  if (!producto) {
    return (
      <main style={{ padding: 16 }}>
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver</Link>
      </main>
    );
  }

  return (
    <main className="detalle">
      <div className="detalle__card">
        {mensaje && (
          <div style={{ background: "#d4edda", color: "#155724", padding: "0.5rem", borderRadius: "4px", marginBottom: "1rem" }}>
            {mensaje}
          </div>
        )}

        <div className="detalle__top">
          <div className="detalle__imgWrap">
            <img
              src={producto.imagen}
              alt={producto.titulo}
              className="detalle__img"
            />
          </div>

          <div className="detalle__info">
            <div className="detalle__formato">{producto.tapa}</div>
            <h2 className="detalle__titulo">{producto.titulo}</h2>
            <div className="detalle__autor">{producto.autor}</div>
            <div><span className="detalle__label">Año:</span> <span className="detalle__value">{producto.anio}</span></div>
            <div><span className="detalle__label">Idioma:</span> <span className="detalle__value">{producto.idioma}</span></div>
            <div><span className="detalle__label">Páginas:</span> <span className="detalle__value">{producto.paginas}</span></div>
            <div><span className="detalle__label">Editorial:</span> <span className="detalle__value">{producto.editorial}</span></div>
            <div><span className="detalle__label">Estado:</span> <span className="detalle__value">{producto.estado}</span></div>
            <div className="detalle__precio">{producto.precio} €</div>
          </div>
        </div>

        <hr className="detalle__hr" />

        <div className="detalle__sinopsis">
          <div className="detalle__sinopsisTitle">Sinopsis</div>
          <p className="detalle__sinopsisText">{producto.sinopsis}</p>
        </div>

        <div className="detalle__acciones">
          <button className="btn-comprar" onClick={añadirAlCarrito}>
            🛒 Añadir al carrito
          </button>
          <div className="detalle__envio">Envío gratis</div>
          <Link className="detalle__volver" to="/">Volver</Link>
        </div>
      </div>
    </main>
  );
}