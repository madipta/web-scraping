import React from "react";

/* eslint-disable-next-line */
export interface TrendingProps {}

export function Trending(props: TrendingProps) {
  return (
    <ul className="flex w-full items-stretch pb-4 mb-16 overflow-x-hidden">
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub1.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          WhatsApp Akan Hadirkan Fitur Canggih, Disappearing Mode
        </div>
      </li>
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub2.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          Penduduk Gaza Tewas Akibat Serangan Israel Capai 197 Orang
        </div>
      </li>
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub3.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          13.675 Dites Acak saat Arus Balik, 72 Orang Reaktif Corona
        </div>
      </li>
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub4.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          Pegawai KPK Tak Lulus TWK Bakal Gugat SK Penonaktifan
        </div>
      </li>
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub5.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          Israel Jelaskan Serangan ke Kantor Berita AP dan Al-Jazeera
        </div>
      </li>
      <li className="flex flex-none flex-col bg-gray-100 w-60 mr-4 overflow-hidden">
        <img className="" src="assets/sub6.jpeg" alt=""></img>
        <div className="pt-2 px-3 pb-3">
          Gojek dan Tokopedia Resmi Merger Jadi GoTo
        </div>
      </li>
    </ul>
  );
}

export default Trending;