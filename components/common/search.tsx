import { searchFieldCompType } from '@/types/appTypes'
import React from 'react'
import { CiSearch } from "react-icons/ci";

function SearchFieldComp({ 
    inputTextStyle,
    inputDivStyle,
    inputPlaceholder,
    inputState,
    setInputState
}: searchFieldCompType ) {
  return (
      <div className={ `py-2 px-3 flex-1 flex flex-row space-x-2 items-center bg-[#F9F9F9] rounded-md ${inputDivStyle}`}>
          <input type="text"
              placeholder={ inputPlaceholder }
              className={ ` outline-none h-6 ${inputTextStyle}`}
              value={inputState}
              onChange={e => setInputState(e.target.value)}
          />
          <CiSearch
          size={16}
          />
    </div>
  )
}

export default SearchFieldComp