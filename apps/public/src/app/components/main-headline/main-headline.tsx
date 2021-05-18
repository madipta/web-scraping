import React from "react";

/* eslint-disable-next-line */
export interface MainHeadlineProps {}

export function MainHeadline(props: MainHeadlineProps) {
  return (
    <div className="relative flex flex-1 overflow-hidden mx-auto mb-12 md:mb-0">
      <img src="assets/main.jpeg" alt=""></img>
      <div className="absolute left-0 bottom-0 bg-gray-900 text-white text-sm md:text-base font-medium py-2 px-4 w-4/5 mb-4 opacity-80">
        test dululah yang agak panjang dikit biar kelihatan ukurannya pas atau
        nggak
      </div>
    </div>
  );
}

export default MainHeadline;
