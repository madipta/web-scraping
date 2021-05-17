import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Link } from "react-router-dom";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <div className="font-mono text-sm max-w-screen-lg px-3 mx-auto">
        <div className="text-3xl mb-10">Search Engine</div>
        <div className="flex flex-nowrap border border-gray-700 overflow-hidden mx-auto">
          <input
            type="search"
            placeholder="What are you searching for?"
            className="flex-1 focus:outline-none min-w-0 px-2 py-2"
          ></input>
          <button className="flex-none bg-gray-700 text-gray-100 px-4">
            Search
          </button>
        </div>
        <nav className="mx-auto mt-2 mb-10">
          <ul className="flex justify-center">
            <li className="whitespace-nowrap mx-2">
              <a href="/" className="text-gray-600 font-semibold">
                Fiqih
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-6 mb-16">
          <div className="relative flex flex-1 overflow-hidden">
            <img src="assets/main.jpeg" alt=""></img>
            <div className="absolute left-0 bottom-0 bg-gray-900 text-white text-base font-medium py-2 px-6 mb-4 mx-16 opacity-80">
              test dululah yang agak panjang dikit biar kelihatan ukurannya pas
              atau nggak
            </div>
          </div>
          <ul className="flex flex-col w-80">
            <li className="flex gap-4 mb-4">
              <img src="assets/hl1.jpeg" alt="" className="w-28"></img>
              <span className="flex flex-col flex-1">
                VIDEO: Kemenangan Penuh Drama Jack Miller di MotoGP Prancis
              </span>
            </li>
            <li className="flex gap-4 mb-4">
              <img src="assets/hl2.jpeg" alt="" className="w-28"></img>
              <span className="flex flex-col flex-1">
                Mulai Besok Masuk DKI Pakai Surat Bebas Covid, Bukan SIKM
              </span>
            </li>
            <li className="flex gap-4 mb-4">
              <img src="assets/hl3.jpg" alt="" className="w-28"></img>
              <span className="flex flex-col flex-1">
                Buruh Ancam Boikot Produk Indomaret Akibat Kasus THR 2020
              </span>
            </li>
            <li className="flex gap-4 mb-4">
              <img src="assets/hl4.jpeg" alt="" className="w-28"></img>
              <span className="flex flex-col flex-1">
                Antisipasi Lonjakan Covid, Pangdam-Kapolda Pantau Wisma Atlet
              </span>
            </li>
            <li className="flex gap-4 mb-4">
              <img src="assets/hl5.jpeg" alt="" className="w-28"></img>
              <span className="flex flex-col flex-1">
                Studi Ungkap Terapi Plasma Darah Pasien Corona Tidak Efektif
              </span>
            </li>
          </ul>
        </div>
        <ul className="flex w-full items-stretch gap-4 pb-4 mb-16 overflow-x-hidden">
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub1.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              WhatsApp Akan Hadirkan Fitur Canggih, Disappearing Mode
            </div>
          </li>
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub2.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              Penduduk Gaza Tewas Akibat Serangan Israel Capai 197 Orang
            </div>
          </li>
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub3.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              13.675 Dites Acak saat Arus Balik, 72 Orang Reaktif Corona
            </div>
          </li>
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub4.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              Pegawai KPK Tak Lulus TWK Bakal Gugat SK Penonaktifan
            </div>
          </li>
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub5.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              Israel Jelaskan Serangan ke Kantor Berita AP dan Al-Jazeera
            </div>
          </li>
          <li className="flex flex-none flex-col w-56 bg-gray-100 overflow-hidden">
            <img className="" src="assets/sub6.jpeg" alt=""></img>
            <div className="pt-2 px-3 pb-3">
              Gojek dan Tokopedia Resmi Merger Jadi GoTo
            </div>
          </li>
        </ul>
        <div className="flex mb-16 gap-6">
          <ul className="flex flex-col flex-1 gap-6">
            <li className="flex flex-row items-center">
              <img
                className="flex-none w-44"
                src="assets/md1.jpeg"
                alt=""
              ></img>
              <div className="leading-snug text-lg mx-4">
                <a href="/" className="text-gray-700 font-semibold">
                  3 Calon Lawan Charles Oliveira di UFC
                </a>
              </div>
            </li>
            <li className="flex flex-row items-center">
              <img
                className="flex-none w-44"
                src="assets/md2.jpeg"
                alt=""
              ></img>
              <div className="leading-snug text-lg mx-4">
                <a href="/" className="text-gray-700 font-semibold">
                  Man Utd vs Fulham: Solskjaer Harap Suporter Tak Rusuh
                </a>
              </div>
            </li>
            <li className="flex flex-row items-center">
              <img
                className="flex-none w-44"
                src="assets/md3.jpeg"
                alt=""
              ></img>
              <div className="leading-snug text-lg mx-4">
                <a href="/" className="text-gray-700 font-semibold">
                  Hadapi Lonjakan Kasus Covid, DKI Siapkan Ranjang Isolasi-ICU
                </a>
              </div>
            </li>
            <li className="flex flex-row items-center">
              <img className="flex-none w-44" src="assets/md4.jpg" alt=""></img>
              <div className="leading-snug text-lg mx-4">
                <a href="/" className="text-gray-700 font-semibold">
                  AS Selidiki Penyakit Misterius yang Muncul Dekat Gedung Putih
                </a>
              </div>
            </li>
          </ul>
          <div className="flex flex-col w-64">
            <ul className="flex flex-col gap-4">
              <li className="w-full bg-gray-200 h-64">iklan</li>
              <li className="w-full bg-gray-200 h-64">iklan</li>
              <li className="w-full bg-gray-200 h-64">iklan</li>
            </ul>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
