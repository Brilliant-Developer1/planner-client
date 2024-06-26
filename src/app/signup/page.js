"use client";

import { Tv2 } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { Navbar } from '../components/Navbar';
import GoogleLogin from '../components/GoogleLogin';
import useAuth from '@/hooks/useAuth';
import Button from '../components/Button';
import AuthWrapper from '../components/AuthWrapper';
 // Import the new component

const SignupComponent = () => {
  const [passMatch, setPassMatch] = useState(true);
  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      setPassMatch(false);
      return;
    }

    setPassMatch(true);

    try {
      await createUser(email, password);

      const userData = { name, email, password };
      const token = await firebaseUser.getIdToken();

      const response = await fetch('https://planner-server-5943.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
      } else {
        console.error('Signup failed:', data.message);
      }

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-5 sm:mt-36  flex items-center justify-center ">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold">Create new account</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-md"
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-md"
                  name="email"
                  required
                />
                <span className="text-xs text-gray-500 mt-1">Example: user@example.com</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-md"
                  name="password"
                  required
                />
                <span className="text-xs text-gray-500 mt-1">Up to 8 characters with an uppercase, symbol, and number</span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-md mt-2"
                  name="confirm_password"
                  required
                />
                {!passMatch && (
                  <div className="my-2">
                    <p className="text-red-400">Passwords do not match!</p>
                  </div>
                )}
              </div>
              <div className="text-sm">
                <p>
                  Old user? Please login{' '}
                  <Link className="link text-primary" href="/login">
                    here
                  </Link>.
                </p>
              </div>
              <div className="form-control mt-6">
                <Button type="submit" icon={Tv2}>
                  Signup
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Signup = () => (
  <Suspense fallback={<div className='flex justify-center '><span className="loading loading-ring loading-lg "></span></div>}>
    <AuthWrapper>
      <SignupComponent />
    </AuthWrapper>
  </Suspense>
);

export default Signup;
