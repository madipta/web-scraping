import React from "react";

/* eslint-disable-next-line */
export interface SearchInputProps {}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className="col-start-1 col-end-13 flex flex-nowrap w-full md:w-7/12 overflow-hidden rounded-r-xl mx-auto mb-12">
      <input
        type="search"
        placeholder="What are you searching for?"
        className="flex-1 focus:outline-none min-w-0 px-3 py-2 rounder-l-2 border border-r-0 border-gray-200"
      ></input>
      <button className="flex-none bg-gray-500 text-white font-medium px-4">
        Search
      </button>
    </div>
  );
}

export default SearchInput;
