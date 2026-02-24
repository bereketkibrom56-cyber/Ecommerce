import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items } = useCart();

  if (!items.length) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <div className="cart-items">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <CartSummary />
    </div>
  );
}
