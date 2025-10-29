import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
