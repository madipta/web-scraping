import React from "react";

/* eslint-disable-next-line */
export interface SearchInputProps {}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className="col-start-1 col-end-13 flex flex-nowrap w-full md:w-7/12 border border-gray-700 overflow-hidden mx-auto mb-8">
      <input
        type="search"
        placeholder="What are you searching for?"
        className="flex-1 focus:outline-none min-w-0 px-2 py-2"
      ></input>
      <button className="flex-none bg-gray-700 text-gray-100 px-4">
        Search
      </button>
    </div>
  );
}

export default SearchInput;
