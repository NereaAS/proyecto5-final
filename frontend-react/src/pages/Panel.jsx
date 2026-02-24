import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001/api/proyecto5/react";
const VENTAS_URL = "http://localhost:3001/api/proyecto5/ventas";

export default function Panel() {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [cargandoVentas, setCargandoVentas] = useState(true);
  const [errorVentas, setErrorVentas] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [mensaje, setMensaje] = useState("");

  const cargarProductos = () => {
    setCargando(true);
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar productos");
        return r.json();
      })
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  };

  const cargarVentas = () => {
    setCargandoVentas(true);
    setErrorVentas(null);

    fetch(VENTAS_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar ventas");
        return r.json();
      })
      .then((data) => setVentas(Array.isArray(data) ? data : []))
      .catch((err) => {
        setVentas([]);
        setErrorVentas(err.message || "Error al cargar ventas");
      })
      .finally(() => setCargandoVentas(false));
  };

  useEffect(() => {
    cargarProductos();
    cargarVentas();
  }, []);

  const crearProducto = (e) => {
    e.preventDefault();

    if (Number(precio) < 0) {
      alert("El precio no puede ser negativo");
      return;
    }

    const nuevoProducto = { titulo, autor, precio: Number(precio) };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error al crear producto");
        return r.json();
      })
      .then((productoCreado) => {
        setProductos((prev) => [...prev, productoCreado]);
        limpiarFormulario();
        setMensaje("Producto creado correctamente ✅");
        setTimeout(() => setMensaje(""), 2500);
      })
      .catch(() => alert("Error al crear producto"));
  };

  const borrarProducto = (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este producto?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error("Error al borrar");
      })
      .then(() => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
        setMensaje("Producto eliminado 🗑");
        setTimeout(() => setMensaje(""), 2500);
      })
      .catch(() => alert("Error al borrar"));
  };

  const empezarEdicion = (p) => {
    setEditandoId(p.id);
    setTitulo(p.titulo);
    setAutor(p.autor);
    setPrecio(p.precio);
  };

  const guardarEdicion = (e) => {
    e.preventDefault();

    if (Number(precio) < 0) {
      alert("El precio no puede ser negativo");
      return;
    }

    fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        autor,
        precio: Number(precio),
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error al actualizar");
        return r.json();
      })
      .then((productoActualizado) => {
        setProductos((prev) =>
          prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
        );
        limpiarFormulario();
        setMensaje("Producto actualizado correctamente ✏️");
        setTimeout(() => setMensaje(""), 2500);
      })
      .catch(() => alert("Error al actualizar producto"));
  };

  const limpiarFormulario = () => {
    setTitulo("");
    setAutor("");
    setPrecio("");
    setEditandoId(null);
  };

  const formatearFecha = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso || "—";
    }
  };

  if (cargando) return <main><h2>Cargando productos...</h2></main>;
  if (error) return <main><h2>Error: {error}</h2></main>;

  return (
    <main className="panel-container">
      <h1>Panel de control</h1>

      {mensaje && (
        <div
          style={{
            marginBottom: 16,
            padding: "10px 14px",
            background: "#eafaf1",
            color: "#1e7e34",
            borderRadius: 6,
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          {mensaje}
        </div>
      )}

      <div
        style={{
          background: "#f4f7fb",
          padding: 16,
          borderRadius: 10,
          marginBottom: 24,
          border: "1px solid #dce3ee",
          maxWidth: 900,
        }}
      >
        <h3 style={{ marginBottom: 12 }}>
          ✏️ {editandoId ? "Editar producto" : "Crear nuevo producto"}
        </h3>

        <form
          onSubmit={editandoId ? guardarEdicion : crearProducto}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ padding: 6, minWidth: 200 }}
          />
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
            style={{ padding: 6, minWidth: 200 }}
          />
          <input
            type="number"
            placeholder="Precio"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            style={{ padding: 6, width: 100 }}
          />

          <button
            type="submit"
            style={{
              background: "#2c5cc5",
              color: "white",
              border: "none",
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {editandoId ? "Guardar cambios" : "Crear"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <table className="panel-table">
        <thead>
          <tr>
            <th align="left">Título</th>
            <th align="left">Autor</th>
            <th align="left">Precio</th>
            <th align="left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.titulo}</td>
              <td>{p.autor}</td>
              <td>{p.precio} €</td>
              <td>
                <Link to={`/productos/${p.id}`}>
                  <button className="btn-ver" style={{ marginRight: 8 }}>
                    Ver
                  </button>
                </Link>

                <button
                  className="btn-editar"
                  onClick={() => empezarEdicion(p)}
                  style={{ marginRight: 8 }}
                >
                  Editar
                </button>

                <button className="btn-borrar" onClick={() => borrarProducto(p.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>Registro de compras</h2>

      <button
        className="btn-ver"
        onClick={cargarVentas}
        style={{ marginBottom: 12 }}
      >
        Actualizar registro
      </button>

      {cargandoVentas ? (
        <p>Cargando ventas...</p>
      ) : errorVentas ? (
        <p style={{ color: "crimson" }}>Error: {errorVentas}</p>
      ) : ventas.length === 0 ? (
        <p>No hay compras registradas todavía.</p>
      ) : (
        <table className="panel-table">
          <thead>
            <tr>
              <th align="left">Fecha</th>
              <th align="left">Producto</th>
              <th align="left">Aplicación</th>
              <th align="left">Comprador</th>
            </tr>
          </thead>
          <tbody>
            {ventas
              .slice()
              .reverse()
              .map((v) => (
                <tr key={v.id}>
                  <td>{formatearFecha(v.fecha)}</td>
                  <td>{v.producto?.titulo || "—"}</td>
                  <td>{v.origen || v.app || "—"}</td>
                  <td>{v.comprador || v.developer || "—"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div className="contacto__volver">
        <Link to="/">
          ← Volver a inicio <span className="icono-volver">📚</span>
        </Link>
      </div>
    </main>
  );
}
