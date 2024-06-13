import { Facebook, Instagram, Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-slate-100 text-primary rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">Topic</a>
        </nav>
        <nav className="grid grid-flow-col gap-4 mb-4">
          <Link
            href="mailto:email2obaidul@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail
              className="hover:text-primary transition-colors duration-300"
              title="Email"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/md-obaidullah-brilliant-developer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              className="hover:text-primary transition-colors duration-300"
              title="LinkedIn"
            />
          </Link>
          <Link
            href="https://www.facebook.com/abidh18"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook
              className="hover:text-primary transition-colors duration-300"
              title="Facebook"
            />
          </Link>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by Brilliant Developer</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
