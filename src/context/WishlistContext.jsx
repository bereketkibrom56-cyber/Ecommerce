import { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
