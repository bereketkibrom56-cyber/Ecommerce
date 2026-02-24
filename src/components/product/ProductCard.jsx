import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{formatCurrency(product.price)}</p>
      {/* When you click the link, the browser goes to /product/25.
       React Router compares this to your rules.
        It sees that 25 sits exactly where the :id variable was defined
        then run product details.
         */}
      <Link to={`/product/${product.id}`}>
        <Button>View</Button>
      </Link>
    </div>
  );
}
