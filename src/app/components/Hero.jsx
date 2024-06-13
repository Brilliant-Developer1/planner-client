import { ArrowRight, BookText } from 'lucide-react';
import React from 'react';
import Button from './Button';
import Link from 'next/link';

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1700683533670-2a9eaf3206dc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md flex flex-col gap-8">
            <h1 className=" text-4xl font-bold">Welcome To Planner</h1>
            <p className="text-xl ">Let&apos;s Plan your goal</p>
            <Link href="/dashboard">
              <Button className="btn-secondary" icon={ArrowRight}>
                Let&apos;s Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
