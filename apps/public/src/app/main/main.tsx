import React from "react";
import SearchInput from "../components/search-input/search-input";
import SearchResult from "../components/search-result/search-result";

export function Main() {
  const result = [
    {
      id: 1,
      url: "/",
      imgSrc: "assets/md1.jpeg",
      title: "3 Calon Lawan Charles Oliveira di UFC",
    },
    {
      id: 2,
      url: "/",
      imgSrc: "assets/md2.jpeg",
      title: "Man Utd vs Fulham: Solskjaer Harap Suporter Tak Rusuh",
    },
    {
      id: 3,
      url: "/",
      imgSrc: "assets/md3.jpeg",
      title: "Hadapi Lonjakan Kasus Covid, DKI Siapkan Ranjang Isolasi-ICU",
    },
    {
      id: 4,
      url: "/",
      imgSrc: "assets/md4.jpg",
      title: "AS Selidiki Penyakit Misterius yang Muncul Dekat Gedung Putih",
    },
  ];
  return (
    <div className="auto-rows-max col-start-1 col-end-13 grid grid-cols-12">
      <SearchInput q={""} search={(text) => alert(text)}></SearchInput>
      <SearchResult result={result}></SearchResult>
    </div>
  );
}

export default Main;
