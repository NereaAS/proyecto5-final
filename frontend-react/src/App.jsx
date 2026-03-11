import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import MiniCart from './components/MiniCart'

import Inicio from './pages/Inicio.jsx'
import Panel from './pages/Panel.jsx'
import Contacto from './pages/Contacto.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'

export default function App() {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="app">
      <nav className="nav">
        <img className="logo" src="/covers/logotipo.png" alt="El Séptimo Estante" />
        <Link className="nav__link" to="/">Inicio</Link>
        <Link className="nav__link" to="/panel">Panel</Link>
        <Link className="nav__link" to="/contacto">Contacto</Link>
        
        <div className="cart-hover-container">
          <Link className="nav__link cart-icon" to="/carrito">
            🛒
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
          <MiniCart />
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>

      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <strong>El Séptimo Estante</strong>
            <p>Donde los libros vuelven a empezar</p>
          </div>
          <div className="footer__socials">
            <a href="#" aria-label="instagram"><img src="/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#" aria-label="twitter / X"><img src="/icons/x.svg" alt="X"/></a>
            <a href="#" aria-label="facebook"><img src="/icons/facebook.svg" alt="Facebook" /></a>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__legal">
            <a href="#">Política de privacidad</a><span> · </span>
            <a href="#">Cookies</a><span> · </span>
            <a href="#">Aviso legal</a>
          </div>
          <div className="footer__copy">© 2025 El Séptimo Estante · Proyecto académico</div>
        </div>
      </footer>
    </div>
  )
}
