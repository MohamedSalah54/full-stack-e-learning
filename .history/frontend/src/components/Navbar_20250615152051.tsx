'use client';

import { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);


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
              onClick={() => router.push('/')}
            >
              <div className="relative h-10 w-10">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-full w-full object-contain block"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800 leading-none ml-1">
                cademyX
              </span>
            </div>
          </div>

          {/* Middle - Search (hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </div>

          {/* Right - Search & Cart (Always Visible) */}
          <div className="flex items-center space-x-3 ml-auto">
            <button
              className="hidden md:block px-4 py-1 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 transition"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </button>
            <button
              className="hidden md:block px-4 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
              onClick={() => router.push('/auth/register')}
            >
              Sign Up
            </button>

            <IoMdGlobe className="hidden md:block text-gray-800 text-xl cursor-pointer hover:scale-110 transition" />

            <FaShoppingCart className="text-gray-800 text-xl cursor-pointer hover:scale-110 transition" />

            <FaSearch
              className="md:hidden text-gray-800 text-xl cursor-pointer hover:scale-110 transition"
              onClick={() => setIsSearchOpen(true)}
            />
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
              router.push('/auth/login');
              setIsSidebarOpen(false);
            }}
            className="w-full text-left text-gray-800 hover:text-gray-600"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push('/auth/register');
              setIsSidebarOpen(false);
            }}
            className="w-full text-left text-gray-800 hover:text-gray-600"
          >
            Sign Up
          </button>
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm font-medium mb-2">Categories</p>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-600">Web Development</li>
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
