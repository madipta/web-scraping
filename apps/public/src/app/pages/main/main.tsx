import React, { useEffect, useRef } from "react";
import SearchInput from "../../components/search-input/search-input";
import SearchResult from "../../components/search-result/search-result";
import { ReactComponent as UpIcon } from "../../icons/chevron-up.svg";
import useSearch from "./search";

export function Main() {
  const {
    loading,
    hasMore,
    setQuery,
    page,
    setPage,
    result,
    error,
  } = useSearch();
  const onSearch = (text) => {
    setQuery(text);
    setPage(1);
  };
  const bottomElRef = useRef();
  useEffect(() => {
    const current = bottomElRef.current;
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
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [bottomElRef, hasMore, loading, page, setPage]);
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput search={onSearch}></SearchInput>
      <SearchResult result={result}></SearchResult>
      <div ref={bottomElRef}></div>
      {error && (
        <div className="col-start-1 col-end-13 text-red-500 text-sm text-center mt-5">
          Something error happen..
        </div>
      )}
      {result && result.length > 20 && (
        <div className="fixed bottom-0 right-0 mb-3 mr-5">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="bg-gray-200 text-yellow-600 w-12 p-3 rounded-full focus:outline-none opacity-75"
          >
            <UpIcon></UpIcon>
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
