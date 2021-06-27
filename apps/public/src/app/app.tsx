import React from "react";
import SearchInput from "./components/search-input/search-input";
import MainHeadline from "./components/main-headline/main-headline";
import AppHeader from "./components/app-header/app-header";
import SubHeadlines from "./components/sub-headlines/sub-headlines";
import Trending from "./components/trending/trending";
import Latest from "./components/latest/latest";

export function App() {
  return (
    <>
      <AppHeader></AppHeader>
      <div className="grid grid-cols-12 font-sans text-sm px-3 py-20 mx-auto">
        <SearchInput></SearchInput>
        <MainHeadline></MainHeadline>
        <SubHeadlines></SubHeadlines>
        <Trending></Trending>
        <Latest></Latest>
      </div>
    </>
  );
}

export default App;
