import React from "react";
import SearchInput from "./components/search-input/search-input";
import SearchCategories from "./components/search-categories/search-categories";
import MainHeadline from "./components/main-headline/main-headline";
import AppHeader from "./components/app-header/app-header";
import SubHeadlines from "./components/sub-headlines/sub-headlines";
import Trending from "./components/trending/trending";
import Latest from "./components/latest/latest";
import SideAds from "./components/side-ads/side-ads";

export function App() {
  return (
    <div className="font-mono text-sm max-w-screen-lg px-3 mx-auto">
      <AppHeader></AppHeader>
      <SearchInput></SearchInput>
      <SearchCategories></SearchCategories>
      <div className="flex flex-col md:flex-row mb-16">
        <MainHeadline></MainHeadline>
        <SubHeadlines></SubHeadlines>
      </div>
      <Trending></Trending>
      <div className="flex mb-16">
        <Latest></Latest>
        <SideAds></SideAds>
      </div>
    </div>
  );
}

export default App;
