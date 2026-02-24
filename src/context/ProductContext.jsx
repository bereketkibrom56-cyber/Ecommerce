import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = {
  search: "",
  category: "all",
  sort: "default",
  page: 1
};

function reducer(state, action) {
  return { ...state, [action.type]: action.payload };
  /*// The "Old" Way
switch(action.type) {
  case "page": return {...state, page: action.payload};
  case "search": return {...state, search: action.payload};
  // ... more cases for every single input ...
} */
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsState = () => useContext(ProductContext);
