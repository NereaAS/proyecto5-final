import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:3001/api/proyecto5/react";
const VENTAS_URL = "http://localhost:3001/api/proyecto5/ventas";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

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

  const comprar = () => {
    if (!producto) return;

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
      .then((r) => r.json())
      .then(() => {
        alert("Compra registrada correctamente");
      })
      .catch(() => {
        alert("Error al registrar la compra");
      });
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

            <div>
              <span className="detalle__label">Año:</span>{" "}
              <span className="detalle__value">{producto.anio}</span>
            </div>

            <div>
              <span className="detalle__label">Idioma:</span>{" "}
              <span className="detalle__value">{producto.idioma}</span>
            </div>

            <div>
              <span className="detalle__label">Páginas:</span>{" "}
              <span className="detalle__value">{producto.paginas}</span>
            </div>

            <div>
              <span className="detalle__label">Editorial:</span>{" "}
              <span className="detalle__value">{producto.editorial}</span>
            </div>

            <div>
              <span className="detalle__label">Estado:</span>{" "}
              <span className="detalle__value">{producto.estado}</span>
            </div>

            <div className="detalle__precio">{producto.precio} €</div>
          </div>
        </div>

        <hr className="detalle__hr" />

        <div className="detalle__sinopsis">
          <div className="detalle__sinopsisTitle">Sinopsis</div>
          <p className="detalle__sinopsisText">{producto.sinopsis}</p>
        </div>

        <div className="detalle__acciones">
          <button className="btn-comprar" onClick={comprar}>
            Comprar
          </button>

          <div className="detalle__envio">Envío gratis</div>

          <Link className="detalle__volver" to="/">
            Volver
          </Link>
        </div>
      </div>
    </main>
  );
}