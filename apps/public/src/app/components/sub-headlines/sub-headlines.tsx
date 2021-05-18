import React from "react";

/* eslint-disable-next-line */
export interface SubHeadlinesProps {}

export function SubHeadlines(props: SubHeadlinesProps) {
  return (
    <ul className="flex flex-col w-80 md:ml-6">
      <li className="flex mb-4">
        <img src="assets/hl1.jpeg" alt="" className="w-28 mr-4"></img>
        <span className="flex flex-col flex-1">
          VIDEO: Kemenangan Penuh Drama Jack Miller di MotoGP Prancis
        </span>
      </li>
      <li className="flex mb-4">
        <img src="assets/hl2.jpeg" alt="" className="w-28 mr-4"></img>
        <span className="flex flex-col flex-1">
          Mulai Besok Masuk DKI Pakai Surat Bebas Covid, Bukan SIKM
        </span>
      </li>
      <li className="flex mb-4">
        <img src="assets/hl3.jpg" alt="" className="w-28 mr-4"></img>
        <span className="flex flex-col flex-1">
          Buruh Ancam Boikot Produk Indomaret Akibat Kasus THR 2020
        </span>
      </li>
      <li className="flex mb-4">
        <img src="assets/hl4.jpeg" alt="" className="w-28 mr-4"></img>
        <span className="flex flex-col flex-1">
          Antisipasi Lonjakan Covid, Pangdam-Kapolda Pantau Wisma Atlet
        </span>
      </li>
      <li className="flex mb-4">
        <img src="assets/hl5.jpeg" alt="" className="w-28 mr-4"></img>
        <span className="flex flex-col flex-1">
          Studi Ungkap Terapi Plasma Darah Pasien Corona Tidak Efektif
        </span>
      </li>
    </ul>
  );
}

export default SubHeadlines;
