import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SearchInput from "../components/search-input/search-input";
import SearchResult, { ISearchResult } from "../components/search-result/search-result";

export function Main() {
  const [eof, setEof] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const fetchSearch = async () => {
    if (!q || q.trim().length < 3) {
      return [];
    }
    const response = await fetch(
      `http://localhost:3000/search?q=${encodeURIComponent(q)}&page=${page}`
    );
    const result = (await response.json()) as ISearchResult[];
    setEof(!result || !result.length);
    return result;
  };
  const { data, status, refetch } = useQuery("search", fetchSearch, {
    enabled: false,
  });
  const onSearch = (text) => {
    setEof(true);
    setQ(text);
    setPage(1);
  };
  useEffect(() => {
    refetch();
  }, [q, page, refetch]);
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput search={onSearch}></SearchInput>
      {status === "success" && <SearchResult result={data}></SearchResult>}
    </div>
  );
}

export default Main;
