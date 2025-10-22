// "use client";
// import React, { useState } from "react";
// import Image from "next/image";

// const page = () => {
//   const [active, setActive] = useState("Dashboard");

//   const menuItems = [
//     {
//       label: "Dashboard",
//       iconDefault: "/home-white.svg",
//       iconActive: "/home-green.svg",
//     },
//     {
//       label: "Create New Course",
//       iconDefault: "/add-white.svg",
//       iconActive: "/add-green.svg",
//     },
//     {
//       label: "My Courses",
//       iconDefault: "/my-courses-white.svg",
//       iconActive: "/my-courses-green.svg",
//     },
//     {
//       label: "Earnings",
//       iconDefault: "/credit-card-white.svg",
//       iconActive: "/credit-card-green.svg",
//     },
//     {
//       label: "Messages",
//       iconDefault: "/messages-white.svg",
//       iconActive: "/messages-green.svg",
//     },
//     {
//       label: "Settings",
//       iconDefault: "/settings-white.svg",
//       iconActive: "/settings-green.svg",
//     },
//     {
//       label: "Help",
//       iconDefault: "/info-white.svg",
//       iconActive: "/info-green.svg",
//     },
//   ];

//   return (
//   <aside
//       className="
//         fixed top-0 left-0
//         w-[247px] h-full
//         pt-[70px] pb-9
//         flex flex-col gap-8
//         bg-[#006661] text-white
//       "
//       style={{
//         boxShadow: "0px 4px 4px 0px #0000004D, 0px 8px 12px 6px #00000026",
//       }}
//     >
//       {/* Logo */}
//       <div
//         className="
//           flex items-center
//           w-[200px] h-[60px]
//           pt-[10px] pl-9 pb-[10px]
//           gap-[10px]
//           rounded-lg text-[#006661] font-bold
          
//         "
//       >
//         <img
//           src={}
//           alt="Logo"
//           width={40}
//           height={40}
//           className="rounded-lg"
//         />
//         <span
//           className="
//             font-inter font-semibold
//             text-2xl leading-[124%]
//             tracking-[-0.03em]
//             text-white
//           "
//         >
//           SkillHatch
//         </span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 pt-5 mt-10">
//         <ul className="flex flex-col gap-3">
//           {menuItems.map((item) => (
//             <li
//               key={item.label}
//               onClick={() => setActive(item.label)}
//               className={`
//                 flex items-center gap-4
//                 w-[220px] h-[40px]  
//                 px-3
//                 rounded-r-md rounded-l-none
//                 cursor-pointer transition
//                 ${
//                   active === item.label
//                     ? "bg-white text-[#006661]"
//                     : "text-white"
//                 }
//               `}
//             >
//               <img
//                 src={active === item.label ? item.iconActive : item.iconDefault}
//                 alt={item.label}
//                 width={25}
//                 height={25}
//                 className="shrink-0"
//               />
//               <span className="whitespace-nowrap">{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Sign out */}
//       <div
//         className="
//           flex items-center gap-3
//           w-[200px] h-[27px] mb-3
//           rounded-md cursor-pointer
//           hover:bg-white hover:text-[#006661]
//           transition
//         "
//       >
//         <button
//           className="
//             flex items-center gap-2 px-4 py-2
//             rounded-md font-semibold text-white
//           "
//         >
//           <img src="/SignOut.svg" alt="Sign Out" width={25} height={25} />
//           <span>Sign-Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default page;
