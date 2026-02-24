import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { totalPrice, tax, grandTotal, items } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>

      <div className="summary-row">
        <span>Tax (10%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>{formatCurrency(grandTotal)}</span>
      </div>

      <button
        className="checkout-btn"
        disabled={!items.length}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
