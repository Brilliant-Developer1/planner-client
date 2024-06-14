'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const blogs = [
  {
    title: 'How to Boost Your Productivity with Planner',
    date: 'June 10, 2024',
    description: 'Learn how to make the most out of TaskMaster with these productivity tips and tricks.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '/blog/boost-productivity',
  },
  {
    title: 'The Importance of Task Management in Remote Work',
    date: 'June 5, 2024',
    description: 'Discover why task management is crucial for remote teams and how TaskMaster can help.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '/blog/remote-work',
  },
  {
    title: 'Top 10 Features of Planner You Should Know About',
    date: 'May 25, 2024',
    description: 'Explore the top 10 features of TaskMaster that can enhance your workflow.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '/blog/top-features',
  },
  {
    title: 'How to Use Planner for Project Management',
    date: 'May 15, 2024',
    description: 'A guide on using TaskMaster for effective project management and collaboration.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '/blog/project-management',
  },
  {
    title: 'Planner vs. Other Task Management Tools',
    date: 'May 1, 2024',
    description: 'A comparison of TaskMaster with other popular task management tools.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '/blog/comparison',
  },
];

const Blogs = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-12 p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="card bg-white shadow-md p-4 rounded-lg">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={400}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-primary">{blog.title}</h3>
            <p className="text-gray-600 mb-2">{blog.date}</p>
            <p className="text-lg mb-4">{blog.description}</p>
            <Link href='#' className="text-primary font-semibold">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Blogs;