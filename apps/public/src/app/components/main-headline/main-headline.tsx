import React from "react";

/* eslint-disable-next-line */
export interface MainHeadlineProps {}

export function MainHeadline(props: MainHeadlineProps) {
  return (
    <div className="col-start-1 col-end-13 md:col-end-8 lg:col-end-8 relative h-72 sm:h-80 md:mr-5">
      <img src="assets/main.jpeg" alt="" className="object-cover h-72 sm:h-80 w-full"></img>
      <div className="absolute left-0 right-0 bottom-0 bg-yellow-300 text-black text-base font-medium py-3 px-4 opacity-90">
        test dululah yang agak panjang dikit biar kelihatan ukurannya pas atau
        nggak
      </div>
    </div>
  );
}

export default MainHeadline;
