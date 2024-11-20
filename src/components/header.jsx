'use client';

import Image from 'next/image';
import Theme from "../components/theme";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [people, setPeople] = useState("/profile_pic.png");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const student_id = decoded.sub;

        fetch(`http://161.246.5.48:3777/users/${student_id}?token=${token}`)
          .then((response) => response.json())
          .then((data) => {
            setName(data.username);
            setPeople(data.profile_picture || "/profile_pic.png"); // Fallback to default
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token not found");
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out!");
    alert("Logged out!");

    router.push("/");
  };

  const ConditionalMessage = () => {
    const pageMessages = {
      "/question": `Welcome ${name}!`,
      "/profile": "Profile Dashboard",
      "/create_problem": "Create Problem",
    };

    if (pathname.includes("/question/") && pathname.includes("/update")) {
      return <p className="font-syne text-6xl dark:text-white text-black">Edit Problem</p>;
    }

    const message = pageMessages[pathname];

    return message ? (
      <p className="font-syne text-6xl dark:text-white text-black">
        {message}
      </p>
    ) : null;
  };

  return (
    <nav className="dark:bg-black bg-white w-full h-24 text-lightText "> {/* Added top-0 and z-50 for layering */}
      <div className='h-full w-full mx-auto inline-flex items-center justify-between px-4'>
        <div className="space-y-2 h-[70%] w-[60%]">
          <ConditionalMessage />
        </div>
        <div className="relative flex items-center ml-auto">
          <div className="p-4 pb-8">
            <Theme />
          </div>
          <div
            className='p-8 pb-12 relative'
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Image src={people || "/profile_pic.png"} alt="User" width={50} height={50} className='rounded-full' />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
                    Logout
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
