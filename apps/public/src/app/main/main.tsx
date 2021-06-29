import React from "react";
import SearchInput from "../components/search-input/search-input";
import SearchResult from "../components/search-result/search-result";

export function Main() {
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput></SearchInput>
      <SearchResult result={[]}></SearchResult>
    </div>
  );
}

export default Main;
