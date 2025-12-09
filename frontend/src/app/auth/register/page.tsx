"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRoles } from "@/types/user";
import { useRegisterLogic } from "@/hooks/auth/useRegisterLogic";

const RegisterPage: React.FC = () => {
  const { form, handleChange, handleSubmit, isPending, error } = useRegisterLogic();


  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="w-1/2 relative hidden md:block">
        <Image src="/signup.png" alt="Signup" fill className="object-cover" />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Create an account</h2>

          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === "string" ? error : (error as any)?.response?.data?.message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
                required
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
                required
              />
            </div>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
            >
              <option value={UserRoles.STUDENT}>Student</option>
              <option value={UserRoles.INSTRUCTOR}>Instructor</option>
            </select>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
