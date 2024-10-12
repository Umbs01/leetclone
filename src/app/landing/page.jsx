import FirstNavbar from "@/components/firstnavbar";
import Image from "next/image";
import page_logo from "/public/Next.js.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="dark:bg-slate-950 bg-white flex-col flex min-h-screen">
      <FirstNavbar />
      <div className="flex-auto flex items-center justify-center flex-col">
        <Image src={page_logo} width={500} height={500} alt="Logo image" />
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
