import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, dispatch } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return;

    setLoading(true);

    setTimeout(() => {
      dispatch({ type: "CLEAR" });
      setLoading(false);
      alert("Payment Successful!");
      navigate("/");
      //Use  when you want to change pages automatically
      navigate("/");
    }, 2000);
  };

  if (!items.length) return <h2>Cart empty</h2>;

  return (
    <form onSubmit={handleSubmit} className="checkout">
      <input
        placeholder="Name"
        /*You are saying: "Keep everything exactly as it is, 
         but override just the name."*/

        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Address"
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <button disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
