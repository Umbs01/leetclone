'use client';

import { useEffect } from "react";
import FirstNavbar from "@/components/firstnavbar";
import Image from "next/image";
import page_logo from "/public/Python.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/question");
    } else {
      console.log("No token found");
    }
  }, []);

  return (
    <div className="dark:bg-slate-950 bg-white flex-col flex min-h-screen">
      <FirstNavbar />
      <div className="flex-auto flex items-center justify-center flex-col">
        <Image src={page_logo} width={600} height={600} alt="Logo image" />
        <p className="text-black dark:text-white">
          Welcome to SE coding platform!
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/login">
            <button className="text-white dark:bg-dark_theme hover:dark:bg-dark_theme_click bg-light_theme  hover:bg-light_theme_click py-2 px-4 font-bold rounded-full focus:outline-none focus:ring-2">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className=" text-white dark:bg-dark_theme hover:dark:bg-dark_theme_click bg-light_theme  hover:bg-light_theme_click py-2 px-4 font-bold rounded-full focus:outline-none focus:ring-2">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
