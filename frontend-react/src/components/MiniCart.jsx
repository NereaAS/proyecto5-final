import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './MiniCart.css';

const MiniCart = () => {
  const { cart, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="minicart minicart--vacio">
        <p>🛒 El carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="minicart">
      {cart.slice(0, 3).map((item) => (
        <div key={item.id} className="minicart__item">
          <img
            src={`http://localhost:3001${item.imagen}`}
            alt={item.titulo}
            className="minicart__img"
            onError={(e) => e.target.src = 'https://via.placeholder.com/45'}
          />
          <div className="minicart__detalle">
            <span className="minicart__titulo">{item.titulo}</span>
            <span className="minicart__cantidad">{item.quantity} x {item.precio}€</span>
          </div>
        </div>
      ))}
      
      {cart.length > 3 && (
        <div className="minicart__mas">+{cart.length - 3} más</div>
      )}
      
      <div className="minicart__total">
        <strong>Total:</strong> {totalPrice}€
      </div>
      
      <Link to="/carrito" className="minicart__btn">
        Ver carrito completo
      </Link>
    </div>
  );
};

export default MiniCart;