import { formatCurrency } from "../../utils/currency";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleRemove = () => {
    if (window.confirm("Remove this item from cart?")) {
      dispatch({ type: "REMOVE", payload: item.id });
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="cart-info">
        <h4>{item.title}</h4>
        <p>{formatCurrency(item.price)}</p>
      </div>

      <div className="cart-qty">
        <button
          onClick={() => dispatch({ type: "DECREASE", payload: item.id })}
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => dispatch({ type: "INCREASE", payload: item.id })}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-total">
        {formatCurrency(item.price * item.quantity)}
      </div>

      <button className="remove-btn" onClick={handleRemove}>
        ×
      </button>
    </div>
  );
}
