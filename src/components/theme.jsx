"use client"; 

import { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const Theme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
  <div className='relative w-16 h-8 flex items-center dark:bg-gray-600 bg-gray-500 cursor-pointer rounded-full p-1'
    onClick={() => setDarkMode(!darkMode)}>
        <div className='absolute dark:bg-dark_theme bg-light_theme w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex justify-center items-center'
            style={{ left: darkMode ? '2px' : 'unset', right: darkMode ? 'unset' : '2px' }}>
    {darkMode ? (
      <FaMoon className="text-black dark:text-white text-2xl" size={18} />
    ) : (
      <BsSunFill className="text-white dark:text-black" size={18} />
    )}
    
  </div>
  
</div>

  );
};

export default Theme;
