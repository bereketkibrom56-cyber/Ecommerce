import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import { ThemeProvider } from "../context/ThemeContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ToastProvider } from "../context/ToastContext";

export const StoreProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <ProductProvider>
        <WishlistProvider>
          <ToastProvider>
            <CartProvider>{children}</CartProvider>
          </ToastProvider>
        </WishlistProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};
