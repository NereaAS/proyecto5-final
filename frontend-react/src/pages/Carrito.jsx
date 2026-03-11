import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Carrito.css';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);

  const finalizarCompra = () => {
    cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        fetch('http://localhost:3001/api/proyecto5/ventas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            comprador: 'Nerea Alba Sanz',
            origen: 'react',
            producto: {
              id: item.id,
              titulo: item.titulo,
              precio: item.precio
            }
          })
        })
        .then(res => res.json())
        .then(data => console.log('✅ Compra registrada:', data))
        .catch(err => console.error('❌ Error:', err));
      }
    });
    alert('✅ Compra realizada. Gracias por tu pedido.');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <main className="carrito-vacio">
        <h2>🛒 Tu carrito está vacío</h2>
        <Link to="/" className="btn-volver">Volver a inicio</Link>
      </main>
    );
  }

  return (
    <main className="carrito">
      <h1 className="carrito__titulo">Tu carrito</h1>
      
      <div className="carrito__lista">
        {cart.map((item) => (
          <div key={item.id} className="carrito__item">
            <img
              src={item.imagen.startsWith('http') ? item.imagen : `http://localhost:3001${item.imagen}`}
              alt={item.titulo}
              className="carrito__img"
              onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
            />
            
            <div className="carrito__info">
              <h3 className="carrito__titulo-item">{item.titulo}</h3>
              <p className="carrito__autor">{item.autor}</p>
              <p className="carrito__precio-item">{item.precio} €</p>
            </div>

            <div className="carrito__cantidad">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn-cantidad">−</button>
              <span className="cantidad">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn-cantidad">+</button>
            </div>

            <button onClick={() => removeFromCart(item.id)} className="btn-eliminar">Eliminar</button>
          </div>
        ))}
      </div>

      <div className="carrito__resumen">
        <div className="resumen__linea">
          <span>Total productos:</span>
          <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="resumen__linea total">
          <span>Total a pagar:</span>
          <span>{totalPrice} €</span>
        </div>

        <div className="carrito__acciones">
          <button onClick={clearCart} className="btn-vaciar">Vaciar carrito</button>
          <button onClick={finalizarCompra} className="btn-finalizar">Finalizar compra</button>
        </div>

        <Link to="/" className="btn-seguir">← Seguir comprando</Link>
      </div>
    </main>
  );
};

export default Carrito;