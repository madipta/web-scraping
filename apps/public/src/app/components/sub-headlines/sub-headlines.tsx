import React from "react";

/* eslint-disable-next-line */
export interface SubHeadlinesProps {}

export function SubHeadlines(props: SubHeadlinesProps) {
  return (
    <div className="col-start-1 col-end-13 md:col-start-8 text-gray-600 text-xs font-medium mt-10 md:mt-0 overflow-auto">
      <a href="#url" className="flex mb-5 md:mb-3">
        <img src="assets/hl1.jpeg" alt="" className="object-cover w-36 mr-3"></img>
        <p className="flex-1">
          VIDEO: Kemenangan Penuh Drama Jack Miller di MotoGP Prancis
        </p>
      </a>
      <a href="#url" className="flex mb-5 md:mb-3">
        <img src="assets/hl2.jpeg" alt="" className="object-cover w-36 mr-3"></img>
        <p className="flex-1">
          Mulai Besok Masuk DKI Pakai Surat Bebas Covid, Bukan SIKM
        </p>
      </a>
      <a href="#url" className="flex mb-5 md:mb-3">
        <img src="assets/hl3.jpg" alt="" className="object-cover w-36 mr-3"></img>
        <p className="flex-1">
          Buruh Ancam Boikot Produk Indomaret Akibat Kasus THR 2020
        </p>
      </a>
      <a href="#url" className="flex mb-5 md:mb-3">
        <img src="assets/hl4.jpeg" alt="" className="object-cover w-36 mr-3"></img>
        <p className="flex-1">
          Antisipasi Lonjakan Covid, Pangdam-Kapolda Pantau Wisma Atlet
        </p>
      </a>
      <a href="#url" className="flex mb-5 md:mb-3">
        <img src="assets/hl5.jpeg" alt="" className="object-cover w-36 mr-3"></img>
        <p className="flex-1">
          Studi Ungkap Terapi Plasma Darah Pasien Corona Tidak Efektif
        </p>
      </a>
    </div>
  );
}

export default SubHeadlines;
