// Header.js
'use client';

import Image from 'next/image';
import Theme from "../components/theme";
import { useEffect, useState } from "react";
import Link from 'next/link';

const Header = () => {
  const [name, setName] = useState("John");
  const [people, setPeople] = useState("/person.png");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/user') //wait api
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setPeople(data.people);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="dark:bg-black bg-white w-full h-40 text-lightText sticky top-0 z-50"> {/* Added top-0 and z-50 for layering */}
      <div className='h-full w-full mx-auto inline-flex items-center justify-between px-4'>
        <div className="space-y-2 h-[70%] w-[60%]">
          <p className="font-syne text-6xl dark:text-white text-black">Welcome {name}!</p>
          <p className="font-syne text-xl dark:text-white text-black">Here is your Profile Dashboard</p>
        </div>
        <div className="relative flex items-center ml-auto mt-8">
          <div className="p-4 pb-20">
            <Theme />
          </div>
          <div 
            className='p-8 pb-24 relative' 
            onMouseEnter={toggleDropdown} 
            onMouseLeave={toggleDropdown}
          >
            <Image src={people} alt="User" width={50} height={50} className='rounded-full' />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <Link href="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
