import React from "react";

/* eslint-disable-next-line */
export interface LatestProps {}

export function Latest(props: LatestProps) {
  return (
    <ul className="flex flex-col flex-1 text-sm md:text-base mr-6">
      <li className="flex flex-col md:flex-row items-center mb-6 md:mr-10">
        <img
          className="flex-none w-full md:w-44 mb-2 md:mb-0"
          src="assets/md1.jpeg"
          alt=""
        ></img>
        <a href="/" className="text-gray-600 font-semibold mx-4">
          3 Calon Lawan Charles Oliveira di UFC
        </a>
      </li>
      <li className="flex flex-col md:flex-row items-center mb-6 md:mr-10">
        <img
          className="flex-none w-full md:w-44 mb-2 md:mb-0"
          src="assets/md2.jpeg"
          alt=""
        ></img>
        <a href="/" className="text-gray-600 font-semibold mx-4">
          Man Utd vs Fulham: Solskjaer Harap Suporter Tak Rusuh
        </a>
      </li>
      <li className="flex flex-col md:flex-row items-center mb-6 md:mr-10">
        <img
          className="flex-none w-full md:w-44 mb-2 md:mb-0"
          src="assets/md3.jpeg"
          alt=""
        ></img>
        <a href="/" className="text-gray-600 font-semibold mx-4">
          Hadapi Lonjakan Kasus Covid, DKI Siapkan Ranjang Isolasi-ICU
        </a>
      </li>
      <li className="flex flex-col md:flex-row items-center mb-6 md:mr-10">
        <img
          className="flex-none w-full md:w-44 mb-2 md:mb-0"
          src="assets/md4.jpg"
          alt=""
        ></img>
        <a href="/" className="text-gray-600 font-semibold mx-4">
          AS Selidiki Penyakit Misterius yang Muncul Dekat Gedung Putih
        </a>
      </li>
    </ul>
  );
}

export default Latest;
