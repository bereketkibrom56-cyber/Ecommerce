import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Loader from "./components/ui/Loader";
import ScrollToTop from "./components/ui/ScrollToTop";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Normally, import Home from "./pages/Home" is Static. 
// It loads the file immediately when the app starts.import("./pages/Home") is Dynamic.
// It returns a Promise. It says: "Go find this file only when I tell you to."




const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
// How suspense and lazy work together?
/*1)user clicks Cart
  2)React looks at the Route: It sees <Cart />
  3)React realizes: "Wait, Cart is a lazy component. I don't have the code for it yet!"
  4)The Trigger: React "throws" a promise.
  5) The nearest <Suspense> component "catches" that promise.
  6)The Fallback: Suspense says: "While I wait for the Cart code to download, I will show the <Loader/>."
  7) when import() promises finishes(code arrives),
  Suspense removes the Loader and finally shows the Cart page.


 */
export default function App() {
  return (
    <>
    <ErrorBoundary>
      {/*  If your Navbar itself was "lazy loaded", or if the very first time a user lands on your site, 
      the basic layout isn't ready, the Outer Suspense shows a loader for the entire screen. */}
  <Suspense fallback={<Loader />}>
  {/* putting ScrollToTop above Navbar enssures the scroll happens the very instant the URL starts changing,
   often before the new page even finishes rendering.  */}
      <ScrollToTop />
      <Navbar />
{/* Inner Suspense: Keeps the Navbar visible while pages load.
    Outer Suspense: A safety net for the very first time the site opens.
 */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
  </Suspense>
</ErrorBoundary>
    </>
  );
}
