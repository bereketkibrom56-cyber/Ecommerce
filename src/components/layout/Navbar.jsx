import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { dark, toggle } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/">E-Shop</Link>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart ({totalItems})</NavLink>
        <button onClick={toggle}>{dark ? "Light" : "Dark"}</button>
      </div>
    </nav>
  );
}
