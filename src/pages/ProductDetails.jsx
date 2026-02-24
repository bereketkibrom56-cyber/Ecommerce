import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../utils/currency";
import { useState } from "react";

export default function ProductDetails() {
  /*useParams  talks to the Route component that is currently active.
   it see the key name id and extract whatever is in that position
  */
  const { id } = useParams();
  const { data, loading } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  const { dispatch } = useCart();
  const { show } = useToast();
  const [qty, setQty] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  const addToCart = () => {
    dispatch({ type: "ADD", payload: { ...data, quantity: qty } });
    show("Added to cart");
  };

  return (
    <div className="details">
      <img src={data.image} alt={data.title} />
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>{formatCurrency(data.price)}</p>
        <p>⭐ {data.rating.rate}</p>

        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
        />

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
