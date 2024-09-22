"use client"; 
import Image from "next/image";
import Logo from "../image/Logo.png";
import Theme from "../components/theme"; 
import { FaCode } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";

const Sidebar = () => {
    return (
        <div className="text-white pt-8">
                <Image className=" block ml-auto mr-auto" src={Logo} alt="Logo" />
                <div className="text-black  dark:text-white">
                    <a className="flex items-center space-x-4 justify-center pt-40 hover:text-light_theme hover:dark:text-dark_theme" href="../test">
                        <FaCode className="text-2xl" />
                        <p>Test</p>
                    </a>
                    <a className="flex items-center space-x-4 justify-center pt-20 hover:text-light_theme hover:dark:text-dark_theme" href="../profile">
                        <GoPerson className="text-2xl" />
                        <p>Profile</p>
                    </a>
                </div>
        </div>
    );
};
  
export default Sidebar;
