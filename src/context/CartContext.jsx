import { createContext, useContext, useReducer, useEffect, useMemo } from "react";

const CartContext = createContext();
/*in real projects structure of state looks like this
const initialState = {
  items: [],           // The actual products
  isLoading: false,    // Is the cart syncing with a database?
  error: null,         // Did a coupon code fail?
  couponCode: "",      // Applied discount code
  shippingMethod: "standard", // User's choice of delivery }
  // but here state contains only items state = { items: [], ... }) */
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || []
};
//In this CartContext, state only contains products currently in the user's cart.

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
  /*if that item exist in our cart,we wil loop through all items array inside state object and 
  change the quantity of that item and live others as previous.
  if not exist, */
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          )
        };
      }
      /*1)...state: This copies any other state properties (like settings or status) so we don't lose them.
        2)items: create a brand new array
        3)...state.items: This "unpacks" all the products currently in the cart into this new array.
        4)action.payload: This "drops" the new product at the very end of that list.

          */
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    case "INCREASE":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        )
      };

    case "DECREASE":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload && i.quantity > 1
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);
/*The word Memo comes from Memoization, which basically means 
"Remembering the result of a expensive calculation." 
//The Core Difference between useMemo and useEffect
useMemo is for CALCULATING: It is used to create "Derived State." 
It calculates a value during the rendering process so you can use it immediately in your JSX.
 It returns a value.
useEffect is for ACTING: It is used for "Side Effects" (like saving to a database, console logs, or setting timers).
 It runs after the render is finished. 
 It does not return a value for you to use in your JSX.
*/
  const derived = useMemo(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const tax = totalPrice * 0.1;
    return {
      totalItems,
      totalPrice,
      tax,
      grandTotal: totalPrice + tax
    };
  }, [state.items]);

  return (
     /*The three dots (...) are the Spread Operator. They "explode" the objects.
     . It takes all the properties inside derived and puts them at the top level.
 */

    <CartContext.Provider value={{ ...state, ...derived, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
