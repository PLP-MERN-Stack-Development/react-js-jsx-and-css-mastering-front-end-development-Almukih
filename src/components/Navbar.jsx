import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    'block px-3 py-2 rounded-md text-sm font-medium transition-colors ' +
    (isActive
      ? 'bg-blue-500 text-white'
      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700');

  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-semibold">PLP Task Manager</span>
            <div className="flex md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 ml-6">
            <NavLink to="/" className={linkClasses}>Tasks</NavLink>
            <NavLink to="/posts" className={linkClasses}>Posts</NavLink>
            <Button variant="secondary" size="sm" onClick={toggle}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden space-y-1 pb-3">
            <NavLink to="/" className={linkClasses} onClick={() => setOpen(false)}>Tasks</NavLink>
            <NavLink to="/posts" className={linkClasses} onClick={() => setOpen(false)}>Posts</NavLink>
            <button
              onClick={() => { toggle(); setOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
