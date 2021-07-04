import React from "react";

export interface SearchResultProps {
  result: { id: number; url: string; imgSrc: string; title: string }[];
}

export function SearchResult(props: SearchResultProps) {
  return (
    <div className="col-start-1 col-end-13 text-gray-700 text-xs sm:text-sm md:text-base mt-5">
      <h2 className="leading-tight text-sm text-gray-600 font-semibold uppercase">
        Search Result
      </h2>
      <hr className="w-8 h-2 border-t-0 border-b-4 border-yellow-500 mb-6"></hr>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 md:gap gap-y-5 sm:gap-y-6 md:gap-y-8">
        {props.result.map((d, i) => (
          <li key={d.id} className="flex flex-col overflow-hidden rounded shadow-xl">
            <div className="bg-gray-300 h-36 overflow-hidden">
              <img
                className="object-cover w-full"
                src={d.imgSrc}
                alt={d.title}
              ></img>
            </div>
            <div className="p-1">
              <a href={d.url} rel="nofollow noreferrer" target="_blank">
                {d.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
