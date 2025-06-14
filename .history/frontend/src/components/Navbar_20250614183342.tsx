'use client';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-[-2px] cursor-pointer" >
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

        {/* Middle - Search */}
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-1 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 transition">
            Login
          </button>
          <button className="px-4 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
            Sign Up
          </button>
          <FaShoppingCart className="text-gray-800 text-xl cursor-pointer hover:scale-110 transition" />
          <IoMdGlobe className="text-gray-800 text-xl cursor-pointer hover:scale-110 transition" />
        </div>
      </div>
    </nav>
  );
}
