import React from "react";
import { ReactComponent as NoPhoto } from "../../icons/no-photo.svg";

export interface ISearchResult {
  id: number;
  url: string;
  image_html: string;
  title: string;
  homeUrl: string;
}

export interface SearchResultProps {
  result: ISearchResult[];
}

export function SearchResult(props: SearchResultProps) {
  if (!props.result || props.result.length < 1) {
    return (
      <div className="col-start-1 col-end-13 text-gray-400 text-xs text-center italic whitespace-nowrap mt-5">
        no result
      </div>
    );
  }
  return (
    <div className="max-w-screen-sm col-start-1 col-end-13 text-gray-700 text-xs sm:text-sm md:text-base mt-5 mx-auto">
      <h2 className="leading-tight text-sm text-gray-600 font-semibold uppercase">
        Search Result
      </h2>
      <hr className="w-8 h-2 border-t-0 border-b-4 border-yellow-500 mb-6"></hr>
      <ul className="grid grid-cols-1 gap-y-6 sm:gap-y-8">
        {props.result.map((d, i) => (
          <li
            key={d.id}
            className="flex flex-col overflow-hidden rounded shadow-xl"
          >
            <div className="bg-gray-300 h-48 sm:h-64 overflow-hidden">
              <a href={d.url} rel="nofollow noreferrer" target="_blank">
                {!d.image_html && (
                  <NoPhoto className="object-contain h-16 my-16 sm:my-24 mx-auto"></NoPhoto>
                )}
                {d.image_html && (
                  <img
                    className="object-cover w-full"
                    src={d.image_html}
                    alt={d.title}
                  ></img>
                )}
              </a>
            </div>
            <div className="pt-3 pb-2 px-4">
              <p>
                <a
                  href={d.url}
                  rel="nofollow noreferrer"
                  target="_blank"
                  className="font-medium text-gray-700 text-lg leading-snug"
                >
                  {d.title}
                </a>
              </p>
              <p className="text-xs text-gray-500 italic mt-3">{d.homeUrl}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
