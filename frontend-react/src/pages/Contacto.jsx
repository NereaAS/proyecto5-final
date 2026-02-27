import { Link } from "react-router-dom";

export default function Contacto() {
  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      {/* Cabecera */}
      <section
        style={{
          background: "linear-gradient(135deg, #f2f6ff, #ffffff)",
          padding: 28,
          borderRadius: 16,
          boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
          marginBottom: 28,
          border: "1px solid rgba(40, 60, 80, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 8 }}>Contacto</h1>
          <p style={{ margin: 0, color: "rgba(33,53,71,0.75)" }}>
             Proyecto académico · El Séptimo Estante
          </p>
        </div>
  
          <img
            src="/covers/favicon.png"
            alt="El Séptimo Estante"
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
            }}
          />
      </section>

      {/* GRID de tarjetas */}
      <section 

        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          marginBottom: 28,
        }}
      >
        {/* Card: Perfil */}
        <div className="contacto-card"
          style={{
            background: "white",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Sobre mí</h2>

          <p>
            Hola, soy <strong>Nerea Alba Sanz</strong>, desarrolladora web en
            formación. Este proyecto forma parte de mi aprendizaje dentro del
            Bootcamp de <strong>Full Stack Developer en Neoland</strong>.
          </p>

          <p>
            Durante la formación he trabajado con{" "}
            <strong>HTML, CSS, JavaScript, React y Node.js</strong>, desarrollando
            aplicaciones web completas.
          </p>

          <p>
            La parte que más disfruto es el{" "}
            <strong>diseño visual y el CSS</strong>, cuidando los detalles de la
            interfaz y la experiencia de usuario.
          </p>

          <p>
            Además del desarrollo web, me apasiona el{" "}
            <strong>dibujo digital</strong> y el diseño creativo, trabajando
            habitualmente con <strong>Procreate</strong>.
          </p>
        </div>

        {/* Card: Historia personal */}
        <div className="contacto-card"
          style={{
            background: "white",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Cómo llegué al desarrollo web</h2>

          <p>
            Mi interés por el desarrollo web surgió a partir del mundo del{" "}
            <strong>dibujo digital</strong>. En un momento dado quise crear una
            pequeña tienda online de camisetas inspiradas en surf, skate y anime,
            y empecé a investigar cómo se construye una web.
          </p>

          <p>
            Al principio me encontré con muchos conceptos técnicos que no
            entendía, pero poco a poco fui descubriendo que me gustaba aprender
            cómo funcionaban las cosas por dentro.
          </p>

          <p>
            Ese proceso de investigar, entender y crear fue lo que me llevó a
            decidir formarme en desarrollo web y combinar{" "}
            <strong>creatividad y tecnología</strong>.
          </p>
        </div>
      </section>

      {/* Contacto profesional */}
      <section className="contacto-profesional"
        style={{
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          marginBottom: 28,
        }}
      >
        <h2>Contacto profesional</h2>

        <ul style={{ listStyle: "none", padding: 0, lineHeight: 1.9 }}>
          <li>
            📧 <strong>Email:</strong>{" "}
            <a href="mailto:nerea_7789@hotmail.com">
              nerea_7789@hotmail.com
            </a>
          </li>

          <li>
            💼 <strong>LinkedIn:</strong>{" "}
            <span style={{ color: "#666" }}>(creando perfil profesional)</span>
          </li>

          <li>
            🧑‍💻 <strong>GitHub:</strong> <a href="https://githum.com/NereaAS" target="_blank" rel="noopener noreferrer">github.com/NereaAS</a></li>
        </ul>

        <p style={{ marginTop: 16, color: "#555" }}>
          Actualmente estoy en proceso de formación y creación de mi perfil
          profesional. Este proyecto forma parte de mi portfolio académico.
        </p>
      </section>

      {/* Cierre */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "14px 18px",
          borderRadius: 12,
          background: "#f2f6ff",
          border: "1px solid rgba(40, 60, 80, 0.12)",
        }}
      >
        <div style={{ color: "rgba(33,53,71,0.8)" }}>
          Proyecto académico · <strong>El Séptimo Estante</strong>
          <p style={{ fontSize: "0.85rem" , color:"#666", marginTop: 16}}>
            © 2026 Nerea Alba Sanz · Proyecto académico Neoland
          </p>
        </div>

        <div className="contacto__volver">
          <Link to="/">
          ← Volver a inicio <span className="icono-volver">📚</span></Link>
        </div>
      </section>
    </main>
  );
}