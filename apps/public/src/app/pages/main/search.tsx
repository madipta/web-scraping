import { useCallback, useEffect, useState } from "react";
import { ISearchResult } from "../../components/search-result/search-result";

export default function useSearch(currentSearch = "") {
  const pagesize = 20;
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(currentSearch);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const fetchSearch = useCallback(async () => {
    if (!query || query.trim().length < 3) {
      setResult([]);
      return;
    }
    try {
      setLoading(true);
      const q = encodeURIComponent(query);
      const response = await fetch(
        `http://localhost:3000/search?q=${q}&page=${page}`
      );
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const result = (await response.json()) as ISearchResult[];
      setResult((prev) => {
        const map = new Map();
        const data = [];
        const union = [...prev, ...result];
        for (const item of union) {
          if (!map.has(item.id)) {
            map.set(item.id, true);
            data.push(item);
          }
        }
        return data;
      });
      setHasMore(result && result.length === pagesize);
    } catch (e) {
      console.error(e);
      setHasMore(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query, page]);
  useEffect(() => {
    setResult([]);
  }, [query]);
  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);
  return { hasMore, loading, query, setQuery, page, setPage, result, error };
}
