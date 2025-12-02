"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/common/Sidbar";
import { sidebarList } from "@/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardBar from "@/components/instructor/dashboard/homeBar/DashboardBar";
import { ArrowRight } from "lucide-react";
import { IconButton, Tooltip, Stack } from "@mui/material";
import { SidebarContext } from "@/context/sidebar-context";

interface InstructorLayoutProps {
  children: ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState(sidebarList[0].id);
  const router = useRouter();

  return (
    <div className="flex w-full relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-[247px]" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 transition-all duration-300 relative p-5 ${
          isSidebarOpen ? "ml-[247px]" : "ml-[150px]"
        }`}
      >
        {/* Dashboard Bar */}
        <div className="relative z-40 bg-[#f9fafb]">
          <DashboardBar />
        </div>

        {/* PAGE CONTENT */}
        <SidebarContext.Provider value={{ isSidebarOpen }}>
          <div className="mt-8">{children}</div>
        </SidebarContext.Provider>
      </main>

      {/* MINI SIDEBAR */}
      {!isSidebarOpen && (
        <div className="fixed top-[70px] left-5 z-[100] flex flex-col items-center gap-2 bg-gray-800 rounded-lg p-2 border border-gray-300">
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            className="!w-9 !h-9 !rounded-full !bg-white shadow-md hover:!bg-gray-200"
          >
            <ArrowRight size={20} color="#1f2937" />
          </IconButton>

          {/* أيقونات mini bar */}
          <Stack spacing={1}>
            {sidebarList.map(
              (item) =>
                item.image &&
                item.path && (
                  <Tooltip key={item.id} title={item.title} placement="right">
                    <IconButton
                      onClick={() => {
                        setActive(item.id);
                        router.push(item.path);
                      }}
                      className={`!w-9 !h-9 !rounded-full shadow-md flex items-center justify-center transition-all
                      ${
                        active === item.id ? "!bg-gray-200" : "!bg-white"
                      } hover:scale-110`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={20}
                        height={20}
                        style={{
                          filter:
                            active === item.id
                              ? "brightness(0)"
                              : "invert(100%)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}
