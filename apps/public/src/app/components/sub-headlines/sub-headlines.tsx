import React from "react";

/* eslint-disable-next-line */
export interface SubHeadlinesProps {}

export function SubHeadlines(props: SubHeadlinesProps) {
  return (
    <ul className="col-start-1 col-end-13 md:col-start-9 lg:col-start-8 text-xs mt-5 md:mt-0">
      <li className="flex mb-5 md:mb-3">
        <img src="assets/hl1.jpeg" alt="" className="w-28 md:w-24 lg:w-36 mr-3"></img>
        <div className="flex-1 flex items-center leading-tight lg:leading-normal">
          <p>VIDEO: Kemenangan Penuh Drama Jack Miller di MotoGP Prancis</p>
        </div>
      </li>
      <li className="flex mb-5 md:mb-3">
        <img src="assets/hl2.jpeg" alt="" className="w-28 md:w-24 lg:w-36 mr-3"></img>
        <div className="flex-1 flex items-center leading-tight lg:leading-normal">
          <p>Mulai Besok Masuk DKI Pakai Surat Bebas Covid, Bukan SIKM</p>
        </div>
      </li>
      <li className="flex mb-5 md:mb-3">
        <img src="assets/hl3.jpg" alt="" className="w-28 md:w-24 lg:w-36 mr-3"></img>
        <div className="flex-1 flex items-center leading-tight lg:leading-normal">
          <p>Buruh Ancam Boikot Produk Indomaret Akibat Kasus THR 2020</p>
        </div>
      </li>
      <li className="flex mb-5 md:mb-3">
        <img src="assets/hl4.jpeg" alt="" className="w-28 md:w-24 lg:w-36 mr-3"></img>
        <div className="flex-1 flex items-center leading-tight lg:leading-normal">
          <p>Antisipasi Lonjakan Covid, Pangdam-Kapolda Pantau Wisma Atlet</p>
        </div>
      </li>
      <li className="flex mb-5 md:mb-3">
        <img src="assets/hl5.jpeg" alt="" className="w-28 md:w-24 lg:w-36 mr-3"></img>
        <div className="flex-1 flex items-center leading-tight lg:leading-normal">
          <p>Studi Ungkap Terapi Plasma Darah Pasien Corona Tidak Efektif</p>
        </div>
      </li>
    </ul>
  );
}

export default SubHeadlines;
