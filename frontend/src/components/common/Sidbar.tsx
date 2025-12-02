"use client";

import React, { useState } from "react";
import { Box, Typography, Stack, Paper, IconButton } from "@mui/material";
import Image from "next/image";
import { white_logo } from "@/assets";
import { sidebarList } from "@/constants";
import { ArrowRight, ArrowLeft, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/zustand/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Sidebar({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const [active, setActive] = useState(sidebarList[0].id);
  const [isOpen, setIsOpen] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/auth/login");
    toast.success("Logged out successfully");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Sidebar */}
      <Box
  sx={{
    width: 247,
    height: "100vh",
    pt: 2,
    pr: 2,
    pb: 4,
    pl: 2,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1f2937",
    boxShadow: "0px 4px 4px #0000004D, 0px 8px 12px 6px #00000026",
    position: "sticky",
    top: 0,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    zIndex: 5,
    overflow: "hidden",
  }}
>

        {/* Close Button */}
        <IconButton
          // onClick={() => setIsOpen(false)}
          onClick={closeSidebar}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "white",
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
            "&:hover": { bgcolor: "#e5e7eb" },
          }}
        >
          <ArrowLeft size={20} color="#1f2937" />
        </IconButton>

        {/* Logo + Name */}
        <Paper
          elevation={0}
          sx={{
            width: 177,
            height: 60,
            p: "10px 8px",
            marginLeft: "20px",
            marginTop: "25px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1f2937",
          }}
        >
          <Box sx={{ width: 40, height: 40, position: "relative" }}>
            <Image
              src={white_logo}
              alt="Logo"
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
          <Typography fontSize={18} fontWeight={600} color="white">
            cademyX
          </Typography>
        </Paper>

        {/* List Items */}
        <Stack spacing={2.5}>
          {sidebarList.map((item) => {
            const isActive = active === item.id;
            return (
              <Box
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  router.push(item.path);
                }}
                sx={{
                  width: "100%",
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "white" : "transparent",
                  transition: "0.2s ease",
                }}
              >
                <Box sx={{ width: 24, height: 24, position: "relative" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                      filter: isActive ? "brightness(0)" : "brightness(1)",
                    }}
                  />
                </Box>
                <Typography
                  fontSize={16}
                  sx={{
                    color: isActive ? "#1f2937" : "white",
                    fontWeight: isActive ? 600 : 400,
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Logout Button */}
        <Box
          onClick={handleLogout}
          sx={{
            marginTop: "auto",
            width: "100%",
            height: 40,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            padding: "6px 8px",
            borderRadius: "8px",
            backgroundColor: "transparent",
          }}
        >
          <Box sx={{ width: 24, height: 24, position: "relative" }}>
            <LogOut color="#fafafa" />
          </Box>
          <Typography
            fontSize={16}
            sx={{
              color: "#f9f9f9",
              fontWeight: 600,
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>

      {/* Open Button */}
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          position: "absolute",
          top: 10,
          left: 0,
          transform: isOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
          bgcolor: "white",
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          zIndex: 10,
          "&:hover": { bgcolor: "#e5e7eb" },
        }}
      >
        <ArrowRight size={20} color="#1f2937" />
      </IconButton>
    </Box>
  );
}
