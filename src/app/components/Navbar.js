'use client';

import useAuth from '@/hooks/useAuth';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Button from './Button';

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
              <Link href="/">Home</Link>
            </li>
            <li>
            <Link href="/blogs">Blogs</Link>
            </li>
            <li>
            <Link href="/aboutus">About Us</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>
            {user && (
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
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
              <Link href="/">Home</Link>
            </li>
            <li>
            <Link href="/blogs">Blogs</Link>
            </li>
            <li>
            <Link href="/aboutus">About Us</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
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
            <Link href="/home">
            <Button
              className="btn btn-outline "
              onClick={handleLogout}
            >
              Log out
              <LogIn className="rotate-180" />
            </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="btn btn-outline ">
                Login
                <LogIn />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};