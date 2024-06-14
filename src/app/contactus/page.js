'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Locate, Mail, Phone, Facebook } from 'lucide-react';

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-12 p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Contact Us</h2>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card items-center bg-white shadow-md p-6 rounded-lg">
          <Mail className="mb-2 text-primary"/>
            <h3 className="text-2xl text-primary font-semibold mb-2">Email Us</h3>
            <p className="text-lg">support@taskmaster.com</p>
          </div>
          <div className="card items-center  bg-white shadow-md p-6 rounded-lg">
            <Phone className="mb-2 text-primary"/>
            <h3 className="text-2xl text-primary font-semibold mb-2">Call Us</h3>
            <p className="text-lg">+1 (800) 123-4567</p>
          </div>
          <div className="card items-center bg-white shadow-md p-6 rounded-lg">
            <Locate className="mb-2 text-primary"/>
            <h3 className="text-2xl text-primary font-semibold mb-2">Visit Us</h3>
            <p className="text-lg">123 TaskMaster Blvd, Suite 100</p>
            <p className="text-lg">Productivity City, PC 12345</p>
          </div>
          <div className="card items-center bg-white shadow-md p-6 rounded-lg">
          <Facebook className="mb-2 text-primary"/>
            <h3 className="text-2xl text-primary font-semibold mb-2">Follow Us</h3>
            <p className="text-lg">Twitter: @TaskMasterApp</p>
            <p className="text-lg">Facebook: TaskMasterApp</p>
          </div>
        </div>
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

export default ContactUs;