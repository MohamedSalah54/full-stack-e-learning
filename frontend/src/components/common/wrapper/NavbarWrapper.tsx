// "use client";

// import React from "react";
// import Navbar from "@/components/organisms/Navbar";
// import { usePathname } from "next/navigation";

// export default function NavbarWrapper() {
//   const pathname = usePathname();

//   const hideNavbarOn = [ "/instructor/dashboard", "/instructor/course/create", "/instructor/myCourses", "/instructor/earning", "/instructor/messages", "/instructor/settings", "/instructor/help"];

//   if (hideNavbarOn.includes(pathname)) return null;

//   return <Navbar />;
// }

"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Navbar = dynamic(() => import("@/components/organisms/Navbar"), {
  ssr: false,
});

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbarOn = [
    "/instructor/dashboard",
    "/instructor/course/create",
    "/instructor/myCourses",
    "/instructor/earning",
    "/instructor/messages",
    "/instructor/settings",
    "/instructor/help",
  ];

  if (hideNavbarOn.includes(pathname)) return null;

  return <Navbar />;
}
