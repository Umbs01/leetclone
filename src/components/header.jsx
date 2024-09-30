"use client"; 

import Image from 'next/image'; 
import Theme from "../components/theme";
import { useEffect, useState } from "react";
import Link from 'next/link';
const Header = () => {
  const [name, setName] = useState("John");
  const [people, setPeople] = useState("/person.png"); 

  useEffect(() => {
    fetch('http://localhost:8000/user') //wait api
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setPeople(data.people);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <nav className="pt-5 dark:bg-black w-full h-40 text-lightText sticky -top-4 ">
      <div className='h-full w-full mx-auto inline-flex items-center justify-between  px-4'>
        <div className="space-y-2 h-[70%] w-[60%]">
          <p className="font-syne text-6xl dark:text-white text-black">Welcome {name}!</p>
          <p className="font-syne text-xl dark:text-white text-black">Here is your Profile Dashboard</p>
        </div>
        <div className="flex items-center ml-auto mt-8">
          <div className="p-4">
            <Theme />
          </div>
          <div className='p-8'>
            <Image src={people} alt="User" width={50} height={50} className='rounded-full'/> {/* Set appropriate width and height */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
