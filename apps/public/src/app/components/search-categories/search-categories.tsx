import React from "react";

/* eslint-disable-next-line */
export interface SearchCategoriesProps {}

export function SearchCategories(props: SearchCategoriesProps) {
  return (
    <nav className="mx-auto mt-2 mb-10">
      <ul className="flex justify-center">
        <li className="whitespace-nowrap mx-2">
          <a href="/" className="text-gray-600 font-semibold">
            Fiqih
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SearchCategories;
