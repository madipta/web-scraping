import { useCallback, useEffect, useState } from "react";
import { ISearchResult } from "../components/search-result/search-result";

export default function useSearch(currentSearch = "") {
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(currentSearch);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const fetchSearch = useCallback(async () => {
    if (!query || query.trim().length < 3) {
      setResult([]);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/search?q=${encodeURIComponent(query)}&page=${page}`
    );
    const result = (await response.json()) as ISearchResult[];
    setLoading(false);
    setHasMore(!result || !result.length);
    setResult((prev) => [...prev, ...result]);
  }, [query, page]);
  useEffect(() => {
    setResult([]);
  }, [query]);
  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);
  return { hasMore, loading, query, setQuery, page, setPage, result };
}
