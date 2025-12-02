"use client";
import { createContext, useContext } from "react";

export const SidebarContext = createContext({ isSidebarOpen: true });

export const useSidebar = () => useContext(SidebarContext);


