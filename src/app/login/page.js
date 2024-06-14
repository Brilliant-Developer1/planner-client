'use client';
import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

import { useRouter, useSearchParams } from 'next/navigation';

import GoogleLogin from '../components/GoogleLogin';
import { Navbar } from '../components/Navbar';
import Button from '../components/Button';

const LoginComponent = () => {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  useEffect(() => {
    if (user) {
      router.replace(from);
    }
  }, [user, from, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <div className=" mt-5 sm:mt-36   flex items-center justify-center">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold">Login now!</h1>
              <p className="mt-2 text-sm text-gray-600">Welcome Back</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-lg"
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
                  name="password"
                  placeholder="********"
                  className="input input-bordered border-primary focus:outline-none focus:ring-0 w-full rounded-lg"
                  required
                />
                <span className="text-xs text-gray-500 mt-1">
                  Up to 8 characters with an uppercase, symbol, and number
                </span>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="text-sm">
                <p>
                  New user? Please register{' '}
                  <Link className="link text-primary" href="/signup">
                    here
                  </Link>.
                </p>
              </div>
              <div className="form-control mt-6">
              <Button type="submit" icon={LogIn}>
                  Login
                </Button>
              </div>
            </form>
            <div className="mt-5">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Login = () => (
  <Suspense fallback={<div className='flex justify-center '><span className="loading loading-ring loading-lg "></span></div>}>
    <LoginComponent />
  </Suspense>
);

export default Login;
