import React from "react";

/* eslint-disable-next-line */
export interface SideAdsProps {}

export function SideAds(props: SideAdsProps) {
  return (
    <div className="flex flex-col w-32 md:w-64">
      <ul className="flex flex-col gap-4">
        <li className="w-full bg-gray-200 h-32 md:h-64 mb-4">iklan</li>
        <li className="w-full bg-gray-200 h-32 md:h-64 mb-4">iklan</li>
        <li className="w-full bg-gray-200 h-32 md:h-64 mb-4">iklan</li>
      </ul>
    </div>
  );
}

export default SideAds;
