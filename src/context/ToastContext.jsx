import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const show = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    // The outer braces { } tell React: "I am about to write JavaScript logic."
    // The inner braces { } create a JavaScript Object.
    //Because the value prop expects an object,
    <ToastContext.Provider value={{ show }}>
      {children}
      {/*A Provider is a component, and like any React component, it can return HTML (JSX).
      
  */}
      {message && <div className="toast">{message}</div>}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
