import React from "react";
import { useQuery } from "react-query";
import SearchInput from "../components/search-input/search-input";
import SearchResult from "../components/search-result/search-result";

export function Main() {
  let q = "";
  const fetchSearch = async () => {
    const res = await fetch(
      "http://localhost:3000/search?q=" + encodeURIComponent(q)
    );
    return res.json();
  };
  const { data, status, refetch } = useQuery("people", fetchSearch, { enabled: false });
  const onSearch = (text) => {
    q = text;
    refetch();
  }
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput q={""} search={onSearch}></SearchInput>
      {status === "success" && <SearchResult result={data}></SearchResult>}
    </div>
  );
}

export default Main;
