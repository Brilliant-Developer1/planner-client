'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-12 p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">About Us</h2>
      <div className="flex flex-col items-center text-center space-y-6">
        <Image
          src="https://img.logoipsum.com/296.svg"
          alt="Logo"
          width={150}
          height={150}
          className="mb-8"
        />
        <p className="text-lg leading-relaxed max-w-2xl">
          Welcome to Planner, your ultimate task management web application. Our mission is to help individuals and teams stay organized, improve productivity, and achieve their goals efficiently. Whether you&apos;re managing personal tasks or collaborating with a team, TaskMaster provides the tools you need to streamline your workflow and stay on top of your to-do list.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl">
          At TaskMaster, we believe in simplicity and effectiveness. Our app is designed with a user-friendly interface that allows you to easily create, organize, and track tasks. With features like drag-and-drop task management, real-time collaboration, and customizable priorities, TaskMaster ensures that you can manage your tasks your way.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl">
          Our team is passionate about productivity and technology. We are constantly working to improve TaskMaster by adding new features and enhancements based on user feedback. We value our community and are committed to providing exceptional support to help you make the most of our app.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl">
          Thank you for choosing TaskMaster. We are excited to be a part of your productivity journey and look forward to helping you achieve your goals. If you have any questions or feedback, please feel free to <Link className="text-primary" href="/contactus">contact us</Link>.
        </p>
        <div className="mt-8">
          <Link className="btn btn-primary" href="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;