import React, { useEffect, useRef } from "react";
import SearchInput from "../components/search-input/search-input";
import SearchResult from "../components/search-result/search-result";
import useSearch from "./search";

export function Main() {
  const { loading, result, hasMore, setQuery, page, setPage } = useSearch();
  const onSearch = (text) => {
    setQuery(text);
    setPage(1);
  };
  const containerRef = useRef();
  useEffect(() => {
    const current = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (loading || !hasMore) return;
        if (entries[0].isIntersecting) {
          setPage(page + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    if (current) observer.observe(current)
    return () => {
      if(current) observer.unobserve(current)
    }
  }, [containerRef, hasMore, loading, page, setPage]);
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput search={onSearch}></SearchInput>
      <SearchResult result={result}></SearchResult>
      <div ref={containerRef}></div>
    </div>
  );
}

export default Main;
