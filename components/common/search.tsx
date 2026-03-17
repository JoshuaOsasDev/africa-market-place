import { searchFieldCompType } from "@/types/appTypes";
import React from "react";
import HomeSearch from "@/components/pageComponents/user/home/homeSearch";

function SearchFieldComp({ inputDivStyle }: searchFieldCompType) {
  return (
    <div
      className={`flex flex-1 flex-row items-center space-x-2 bg-[#F9F9F9] px-3 py-2 md:rounded-md ${inputDivStyle}`}
    >
      <HomeSearch />
    </div>
  );
}

export default SearchFieldComp;
