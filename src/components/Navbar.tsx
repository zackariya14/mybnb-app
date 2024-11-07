"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white tracking-widest">
          <Link href="/">MyBnB</Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          <Link href="/properties" className="hover:text-yellow-300 transition">
            All Properties
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/profile" className="hover:text-yellow-300 transition">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Log In
              </button>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-2 py-4">
          <Link href="/properties" className="block px-4 py-2 hover:bg-blue-600">
            All Properties
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/profile" className="block px-4 py-2 hover:bg-blue-600">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 hover:bg-red-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="block w-full text-left px-4 py-2 hover:bg-green-600"
              >
                Log In
              </button>
              <Link
                href="/auth/register"
                className="block px-4 py-2 hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
