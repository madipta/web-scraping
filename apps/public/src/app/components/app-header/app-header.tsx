import React from "react";
import { ReactComponent as HomeIcon } from '../../icons/search-circle.svg';

export function AppHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 flex items-center py-4 px-3 sm:px-5 md:px-8 mb-2 z-10 shadow-md opacity-95">
      <div className="flex-none w-5 text-yellow-500 mr-1">
        <HomeIcon></HomeIcon>
      </div>
      <h1 className="leading-none text-white text-lg font-medium">Search Portal</h1>
    </div>
  );
}

export default AppHeader;
