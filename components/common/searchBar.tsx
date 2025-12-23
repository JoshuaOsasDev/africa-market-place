import React from "react";

import { SearchIcon } from "lucide-react";

export default function SearchBar(props: {
  placeHolder?: string;
  typeStyle?: string;
  search: string;
  handleFilterChange?: (filter: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className={`hidden w-[320px] items-center justify-start gap-2 rounded-md border border-[#E0E2E7] bg-white px-2 py-3 shadow-sm md:flex`}
    >
      {/* Search Bar */}
      <SearchIcon className="h-5 w-5 text-[#667085]" />
      <input
        type="text"
        value={props.search}
        onChange={(e) => {
          props.setSearch(e.target.value); // update state
          props.handleFilterChange?.(e.target.value); // send raw value back
        }}
        placeholder={props.placeHolder || "Search..."}
        className={`${props.typeStyle}`}
      />
    </div>
  );
}

//   <div className="flex h-[52px] w-[435px] gap-2.5 rounded-[26px] bg-[#F6F6F6] px-4 py-3.5">
//         <Image src={searchIcon} width={24} alt="search-icon" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full placeholder-[#BABABA] outline-none"
//         />
//       </div>
