import React from "react";

export interface SearchResultProps {
  result: { url: string; imgSrc: string; title: string }[];
}

export function SearchResult(props: SearchResultProps) {
  return (
    <div className="col-start-1 col-end-13 text-gray-700 text-xs sm:text-sm md:text-base mt-5">
      <h2 className="leading-tight text-sm text-gray-600 font-semibold uppercase">
        Search Result
      </h2>
      <hr className="w-8 h-2 border-t-0 border-b-4 border-yellow-500 mb-6"></hr>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 md:gap gap-y-5 sm:gap-y-6 md:gap-y-8">
        <li>
          <img className="flex-none w-full" src="assets/md1.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block p-1"
          >
            3 Calon Lawan Charles Oliveira di UFC
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md2.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block p-1"
          >
            Man Utd vs Fulham: Solskjaer Harap Suporter Tak Rusuh
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md3.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block p-1"
          >
            Hadapi Lonjakan Kasus Covid, DKI Siapkan Ranjang Isolasi-ICU
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md4.jpg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block p-1"
          >
            AS Selidiki Penyakit Misterius yang Muncul Dekat Gedung Putih
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SearchResult;
