import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed request");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    /*during data fetching, you might leave home page(The Home component is destroyed).
    React looks at your useEffect and says: 
    "The user is leaving! I must run the cleanup function (the return) for this component."
    React runs: () => (mounted = false).
    A split second later, the API data finally arrives.
    the next line: if (mounted) setData(json) never run because mounted is false
    In React useEffect, the return is not the end of the function; it is a subscription to the future.
     */
    return () => (mounted = false);
  }, [url]);

  return { data, loading, error };
};
