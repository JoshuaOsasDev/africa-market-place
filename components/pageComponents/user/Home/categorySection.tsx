// import TextStyle from "@/components/common/textStyle";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { categorySectionList } from "@/lib/data";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// function CategorySection() {
//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-row items-center space-x-1">
//         <Image
//           alt="menu icon"
//           src={"/images/menu.jpg"}
//           width={20}
//           height={20}
//         />
//         <TextStyle
//           textContent="All Categories"
//           textStyle=" text-[#030712] text-bold"
//         />
//       </div>

//       <div className="flex flex-col space-y-1">
//       {categorySectionList.map((i) => {
//         return (
//           <Accordion
//             type="single"
//             collapsible
//             className={ `w-full  mb-0 ${i.id == 1 ? "bg-purple-700" : "bg-red-500"}`}
//             defaultValue="item-1"
//           >
//             <AccordionItem value="item-1" key={i.id} className="p-0">
//               <AccordionTrigger>
//                 <div className="flex flex-row items-center space-x-1">
//                   <Image alt={i.imgUrl} src={i.imgUrl} width={20} height={20} />
//                   <TextStyle
//                     textContent={i.category}
//                     textStyle="text-[#030712] text-bold"
//                   />
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent className="flex flex-col gap-4 text-balance">
//                 {i.subcategory.map((data) => {
//                   return (
//                     <Link href={data.url}>
//                       <TextStyle textContent={data.name} />
//                     </Link>
//                   );
//                 })}
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         );
//       })}
//      </div>
//     </div>
//   );
// }

// export default CategorySection;
