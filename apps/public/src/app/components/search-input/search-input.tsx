import React, { useState } from "react";
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export interface SearchInputProps {
  search(text: string): void;
}

export function SearchInput(props: SearchInputProps) {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="col-start-1 col-end-13 flex flex-nowrap w-10/12 sm:w-7/12 md:w-6/12 leading-tight overflow-hidden rounded-r-full mx-auto mb-12">
      <input
        type="search"
        placeholder="What are you searching for?"
        defaultValue={searchText}
        onChange={(ev) => { setSearchText(ev.target.value)}}
        className="flex-1 focus:outline-none min-w-0 px-3 py-2 rounder-l-2 border border-r-0 border-gray-200"
      ></input>
      <button 
        onClick={() => props.search(searchText)}
        className="flex-none flex items-center bg-yellow-500 text-white text-xs font-medium pl-3 pr-4 sm:pr-6 focus:outline-none">
        <p className="flex-none w-5"><SearchIcon></SearchIcon></p>
        <p className="ml-1 hidden sm:inline-block">Search</p>
      </button>
    </div>
  );
}

export default SearchInput;
