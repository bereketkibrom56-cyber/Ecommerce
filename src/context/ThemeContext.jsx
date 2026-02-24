import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
