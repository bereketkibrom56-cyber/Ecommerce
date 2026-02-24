import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>E-Shop</h3>
          <p>Modern React E-Commerce Frontend</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          contact us:0942375640
          <br />
          name: Bereket Kibralem
          <br />
          email:bereketKibrom56@gmail.com
        </div>
      </div>

      <div className="footer-bottom">
        © {year} E-Shop. All rights reserved.
      </div>
    </footer>
  );
}
