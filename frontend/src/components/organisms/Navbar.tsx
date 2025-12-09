"use client";

import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { logo } from "@/assets";
import { Search } from "lucide-react";
import { links } from "@/constants";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const [showSearch, setShowSearch] = useState(false);

  const visibility = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showSearch && visibility.current) {
      visibility.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        visibility.current &&
        !visibility.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  const getMe = useAuthStore((state) => state.getMe);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setDropdownOpen(false);
    }
  }, [user]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !user) {
      getMe();
    }
  }, [getMe, user]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (visibility.current && !visibility.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/auth/login");
    toast.success("Logged out successfully");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left - Hamburger + Logo */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Icon - Visible on mobile only */}
            <button
              className="block md:hidden text-xl text-gray-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars />
            </button>

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="relative h-10 w-10">
                <Image
                  src={logo}
                  alt="Logo"
                  className="h-full w-full object-contain block"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800 leading-none ml-1">
                cademyX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-20">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link key={link.name} href={link.href}>
                  <button
                    className={`px-4 py-2 rounded-md transition-all duration-200
                      font-[500] text-[20px] leading-[100%] font-nunito cursor-pointer
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-800 hover:text-gray-900"
                      }`}
                    style={{
                      letterSpacing: "0%",
                      borderRadius: "10%",
                      opacity: 1,
                    }}
                  >
                    {link.name}
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Middle - Search (hidden on small screens) */}

          {showSearch && (
            <div className="flex flex-1 max-w-md mx-4">
              <input
                ref={visibility}
                type="text"
                placeholder="Search courses..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
          )}

          {/* Right - Search & Cart (Always Visible) */}
          <div className="flex items-center space-x-3 ml-auto relative">
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition">
              <IoMdGlobe className="hidden md:block  text-xl cursor-pointer hover:scale-110 transition" />
            </button>
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition">
              <FaShoppingCart className=" text-xl cursor-pointer hover:scale-110 transition" />
            </button>
            <FaSearch className="md:hidden  text-xl cursor-pointer hover:scale-110 transition" />
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                {" "}
                <Search className="w-5 h-5 hover:scale-110 transition cursor-pointer" />
              </button>
            )}

            {user ? (
              <div className="relative" ref={visibility}>
                <div
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-black font-semibold text-sm cursor-pointer hover:opacity-90 transition"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {user?.profilePicture?.secure_url ? (
                    <Image
                      src={user.profilePicture.secure_url}
                      fill
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-black text-base font-bold leading-none">
                      {user.firstName
                        ? user.firstName.charAt(0).toUpperCase()
                        : "?"}
                    </span>
                  )}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        router.push("/profile");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className="hidden md:block px-4 py-1 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </button>
                <button
                  className="hidden md:block px-4 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => router.push("/auth/register")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-start px-4 pt-10">
          <div className="w-full max-w-2xl flex items-center gap-3 border-b border-gray-300 pb-2">
            <FaSearch className="text-gray-800 text-2xl" />

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search courses..."
              autoFocus
              className="w-full text-lg focus:outline-none"
            />

            <FaTimes
              className="text-gray-800 text-2xl cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="p-4 space-y-4">
          <button
            onClick={() => {
              router.push("/auth/login");
              setIsSidebarOpen(false);
            }}
            className="w-full text-left text-gray-800 hover:text-gray-600"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/auth/register");
              setIsSidebarOpen(false);
            }}
            className="w-full text-left text-gray-800 hover:text-gray-600"
          >
            Sign Up
          </button>
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm font-medium mb-2">Categories</p>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-600">
                Web Development
              </li>
              <li className="cursor-pointer hover:text-gray-600">Design</li>
              <li className="cursor-pointer hover:text-gray-600">Marketing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
