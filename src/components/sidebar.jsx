"use client"; 
import Image from "next/image";
import Logo from "../image/Logo.png";
import Link from "next/link";
import { FaCode } from "react-icons/fa6";
import { useEffect } from "react";
import { GoPerson } from "react-icons/go";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
    useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
        try {
            const decodedToken = jwtDecode(token); 
            const isAdmin = decodedToken.role === 'admin'; 
            const testcaseElement = document.getElementById("create_problem");

            if (testcaseElement) {
                testcaseElement.style.display = isAdmin ? "flex" : "none"; 
            }
        } catch (error) {
            console.error('Invalid token:', error); 
        }
    } else {
        console.log('No token found in localStorage');
    }
}, []);
    
    return (
        <div className="text-white pt-8">
            <Image className="block ml-auto mr-auto" src={Logo} alt="Logo" width={150} height={150} />
            <div className="text-black dark:text-white">
                <Link className="flex items-center space-x-4 justify-center pt-40 hover:text-light_theme hover:dark:text-dark_theme" id="test" href="/question">
                    <FaCode className="text-2xl" />
                    <p>Problems</p>
                </Link>
                <Link className="flex items-center space-x-4 justify-center pt-20 hover:text-light_theme hover:dark:text-dark_theme" href="/profile">
                    <GoPerson className="text-2xl" />
                    <p>Profile</p>
                </Link>
                <Link 
                    className="hidden items-center  justify-center space-x-4 pt-20 hover:text-light_theme hover:dark:text-dark_theme" 
                    id="create_problem" 
                    href="/create_problem" 
                >
                    <FaCode className="text-2xl" />
                    <p>Create problem</p>
                </Link>
            </div>
        </div>
    );
};
  
export default Sidebar;
