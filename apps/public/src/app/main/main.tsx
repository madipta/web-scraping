import React from "react";
import SearchInput from "../components/search-input/search-input";
import SearchResult from "../components/search-result/search-result";
import useSearch from "./search";

export function Main() {
  const search = useSearch();
  const onSearch = (text) => {
    search.setQuery(text);
    search.setPage(1);
  };
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput search={onSearch}></SearchInput>
      {search.result && <SearchResult result={search.result}></SearchResult>}
    </div>
  );
}

export default Main;
