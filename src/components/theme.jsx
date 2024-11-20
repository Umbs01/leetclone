// "use client"; 

// import { useEffect, useState } from 'react';
// import { FaMoon } from "react-icons/fa";
// import { BsSunFill } from "react-icons/bs";

// const Theme = () => {
//   // Initialize the dark mode state based on localStorage
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme === 'dark';
//   });

//   // Effect to update the document class based on darkMode state
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('admin', 'arhway');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   return (
//     <div 
//       className='relative w-16 h-8 flex items-center dark:bg-gray-600 bg-gray-500 cursor-pointer rounded-full p-1'
//       onClick={() => setDarkMode(prevMode => !prevMode)} // Toggle darkMode state
//     >
//       <div 
//         className='absolute dark:bg-dark_theme bg-light_theme w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex justify-center items-center'
//         style={{ left: darkMode ? '2px' : 'unset', right: darkMode ? 'unset' : '2px' }}
//       >
//         {darkMode ? (
//           <FaMoon className="text-black dark:text-white text-2xl" size={18} />
//         ) : (
//           <BsSunFill className="text-white dark:text-black" size={18} />
//         )}
//       </div>
//     </div>
//   );
// };
"use client"; 

import { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const Theme = () => {
  // Initialize dark mode state
  const [darkMode, setDarkMode] = useState(true);

  // Use effect to get the saved theme from localStorage after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure code runs only in the browser
      const savedTheme = localStorage.getItem('theme');
      setDarkMode(savedTheme === 'dark'); // Check if savedTheme is 'dark'
    }
  }, []);

  // Effect to update the document class based on darkMode state
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
    <div 
      className='relative w-16 h-8 flex items-center dark:bg-gray-600 bg-gray-500 cursor-pointer rounded-full p-1'
      onClick={() => setDarkMode(prevMode => !prevMode)} // Toggle darkMode state
    >
      <div 
        className='absolute dark:bg-dark_theme bg-light_theme w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex justify-center items-center'
        style={{ left: darkMode ? '2px' : 'unset', right: darkMode ? 'unset' : '2px' }}
      >
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
