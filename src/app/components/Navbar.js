'use client';

import useAuth from '@/hooks/useAuth';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <div className="navbar bg-slate-100 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="w-full h-full">
            <Link href="/">
              <Image
                width={80}
                height={80}
                src="https://img.logoipsum.com/296.svg"
                alt="logo"
                className=" h-10"
              />
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Topics</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
            {user && (
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              className="btn btn-outline btn-primary rounded-lg"
              onClick={handleLogout}
            >
              Log out
              <LogIn className="rotate-180" />
            </button>
          ) : (
            <Link href="/login">
              <button className="btn btn-outline btn-primary rounded-lg">
                Login
                <LogIn />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
