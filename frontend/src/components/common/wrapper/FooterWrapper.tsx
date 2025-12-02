"use client";
import Footer from "@/components/organisms/Footer";
import { usePathname } from "next/navigation";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooter = pathname.startsWith("/instructor"); 

  if (hideFooter) return null;
  return <Footer />;
}
