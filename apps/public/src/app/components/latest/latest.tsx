import React from "react";

/* eslint-disable-next-line */
export interface LatestProps {}

export function Latest(props: LatestProps) {
  return (
    <div className="col-start-1 col-end-13 text-xs mt-5">
      <h2 className="leading-tight text-sm text-gray-600 font-semibold uppercase">Berita Terkini</h2>
      <hr className="w-8 h-2 border-t-0 border-b-4 border-yellow-500 mb-4"></hr>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5">
        <li>
          <img className="flex-none w-full" src="assets/md1.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block text-gray-600 font-semibold p-1"
          >
            3 Calon Lawan Charles Oliveira di UFC
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md2.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block text-gray-600 font-semibold p-1"
          >
            Man Utd vs Fulham: Solskjaer Harap Suporter Tak Rusuh
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md3.jpeg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block text-gray-600 font-semibold p-1"
          >
            Hadapi Lonjakan Kasus Covid, DKI Siapkan Ranjang Isolasi-ICU
          </a>
        </li>
        <li>
          <img className="flex-none w-full" src="assets/md4.jpg" alt=""></img>
          <a
            href="/"
            rel="nofollow"
            className="inline-block text-gray-600 font-semibold p-1"
          >
            AS Selidiki Penyakit Misterius yang Muncul Dekat Gedung Putih
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Latest;
