import React from "react";

/* eslint-disable-next-line */
export interface MainHeadlineProps {}

export function MainHeadline(props: MainHeadlineProps) {
  return (
    <div className="col-start-1 col-end-13 md:col-end-9 lg:col-end-8 md:mr-5">
      <img src="assets/main.jpeg" alt="" className="object-cover w-full"></img>
      <div className="bg-gray-900 text-white text-sm md:text-base font-medium py-2 px-4 opacity-80">
        test dululah yang agak panjang dikit biar kelihatan ukurannya pas atau
        nggak
      </div>
    </div>
  );
}

export default MainHeadline;
