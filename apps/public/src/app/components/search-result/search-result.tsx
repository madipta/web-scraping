import React from "react";

export interface SearchResultProps {
  result: {
    id: number;
    url: string;
    image_html: string;
    title: string;
    homeUrl: string;
  }[];
}

export function SearchResult(props: SearchResultProps) {
  if (!props.result || props.result.length < 1) {
    return (
      <div className="col-start-1 col-end-13 text-gray-400 text-xs text-center italic whitespace-nowrap mt-5">no result</div>
    );
  }
  return (
    <div className="max-w-screen-sm col-start-1 col-end-13 text-gray-700 text-xs sm:text-sm md:text-base mt-5 mx-auto">
      <h2 className="leading-tight text-sm text-gray-600 font-semibold uppercase">
        Search Result
      </h2>
      <hr className="w-8 h-2 border-t-0 border-b-4 border-yellow-500 mb-6"></hr>
      <ul className="grid grid-cols-1 gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-8">
        {props.result.map((d, i) => (
          <li
            key={d.id}
            className="flex flex-col overflow-hidden rounded shadow-xl"
          >
            <div className="bg-gray-300 h-48 sm:h-64 overflow-hidden">
              <img
                className="object-cover w-full"
                src={d.image_html}
                alt={d.title}
              ></img>
            </div>
            <div className="pt-3 pb-2 px-4 leading-snug">
              <p>
                <a
                  href={d.url}
                  rel="nofollow noreferrer"
                  target="_blank"
                  className="font-medium text-gray-700 text-base"
                >
                  {d.title}
                </a>
              </p>
              <p className="text-xs text-gray-500 italic mt-2">{d.homeUrl}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
