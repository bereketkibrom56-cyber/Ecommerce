import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //useLocation: A hook from React Router that returns 
  // an object containing information about the current URL.
  // pathname: This is the specific string of the URL 
  // (e.g., /, /cart, or /product/5)

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
