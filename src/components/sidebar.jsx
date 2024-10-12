"use client"; 
import Image from "next/image";
import Logo from "../image/Logo.png";
import Link from "next/link";
import Theme from "../components/theme"; 
import { FaCode } from "react-icons/fa6";
import { useEffect } from "react";
import { GoPerson } from "react-icons/go";

const Sidebar = () => {
    useEffect(() => {
        const name = localStorage.getItem('admin');
        const testcaseElement = document.getElementById("testcase");
        
        if (testcaseElement) {
            testcaseElement.style.display = name === "arhway" ? "flex" : "none";
        }
    }, []);
    
    return (
        <div className="text-white pt-8">
            <Image className="block ml-auto mr-auto" src={Logo} alt="Logo" width={150} height={150} />
            <div className="text-black dark:text-white">
                <Link className="flex items-center space-x-4 justify-center pt-40 hover:text-light_theme hover:dark:text-dark_theme" href="@/test">
                    <FaCode className="text-2xl" />
                    <p>Test</p>
                </Link>
                <Link className="flex items-center space-x-4 justify-center pt-20 hover:text-light_theme hover:dark:text-dark_theme" href="@/profile">
                    <GoPerson className="text-2xl" />
                    <p>Profile</p>
                </Link>
                <Link 
                    className="hidden items-center  justify-center space-x-4 pt-20 hover:text-light_theme hover:dark:text-dark_theme" 
                    id="testcase" 
                    href="/testcase" 
                    // style={{ display: 'none', float: 'right' }}
                >
                    <GoPerson className="text-2xl" style={{ float: 'left' }} />
                    <p style={{ float: 'left', margin: 0 }}>Test case</p>
                </Link>
            </div>
        </div>
    );
};
  
export default Sidebar;
