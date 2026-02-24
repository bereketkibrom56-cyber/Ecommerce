import { useFetch } from "../hooks/useFetch";
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/ui/Loader";
import { useProductsState } from "../context/ProductContext";
import useDebounce from "../hooks/useDebounce";

const PER_PAGE = 12;

export default function Home() {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products"
  );

  const { search, category, sort, page, dispatch } = useProductsState();
  /*1)call useProductsState inside ProductContext.js
    2) useContext(ProductContext=createContext()) make move 
    up the parent components in your HTML tree.
    3) It looks for the nearest ProductContext.Provider.
    4) Grab the Value
    5)It brings that "package" back to your Home component.
     */
  const debouncedSearch = useDebounce(search);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  let filtered = data
    .filter(p =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter(p => (category === "all" ? true : p.category === category));
/* Math.ceil(): This function always rounds up to the nearest whole number.
let say our filtered products are 19 and per_page is 8. 
19/8 =2.375->3 -totalpages
The slice(start, end) method extracts a portion of an array without changing the original array.
 It starts at the start index and goes up to, but does not include, the end index.
*/
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div>
      <div className="filters">
        <input
          placeholder="Search..."
          onChange={e => dispatch({ type: "search", payload: e.target.value })}
        />
        <select onChange={e => dispatch({ type: "sort", payload: e.target.value })}>
          <option value="default">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
    {/* paginated stores only the 8 products (or fewer on the last page) 
    that should be visible on the screen right now. 
    This is the array you pass to your <ProductGrid /> component.
 */}
      <ProductGrid products={paginated} />

      <div className="pagination">
        {/* you want to show 3 buttons but you can't map on number.
        Array.form({length:3}) converts that number into a physical array:
         [undefined, undefined, undefined] now you can loop.
         "_ " is just a placeholder for the "value -undefined"*/}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => dispatch({ type: "page", payload: i + 1 })}>
            {i + 1}
          </button>
       
        ))}
      </div>
    </div>
  );
}
