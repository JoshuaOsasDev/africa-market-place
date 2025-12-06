import { searchFieldCompType } from "@/types/appTypes";
import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchFieldComp({
  inputTextStyle,
  inputDivStyle,
  inputPlaceholder,
  inputState,
  setInputState,
}: searchFieldCompType) {
  return (
    <div
      className={`flex flex-1 flex-row items-center space-x-2 rounded-md bg-[#F9F9F9] px-3 py-2 ${inputDivStyle}`}
    >
      <input
        type="text"
        placeholder={inputPlaceholder}
        className={`h-6 outline-none ${inputTextStyle}`}
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      <CiSearch size={16} />
    </div>
  );
}

export default SearchFieldComp;
