import React from 'react'
import TextStyle from './textStyle';

function AuthProgressbar({ level }: {
    level: number
}) {

     const list = [
        {
          value: 1,
          id: 1,
        },
        {
          value: 2,
          id: 2,
        },
      ];
  return (
      <div>
           <div className=" flex w-full items-center space-x-2">
          {list.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-1 flex-row items-center space-x-2"
              >
                <div
                  className={`flex items-center justify-center rounded-full  w-8 h-8 ${
                    item.value <= level ? "bg-[#2E7D32]" : "bg-[#EAF2EA]"
                  }`}
                >
                  <TextStyle
                    textContent={item.value.toString()}
                    textStyle={`text-[16px] ${
                      item.value <= level
                        ? "text-[#fff]"
                        : "text-[#2E7D32] text-bold"
                    }`}
                  />
                </div>
                <div
                  className={`flex-1 h-2 rounded-lg ${
                    item.value <= level ? "bg-[#2E7D32]" : "bg-[#EAF2EA]"
                  }`}
                />
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default AuthProgressbar