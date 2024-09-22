import logo from "../image/Logo.png";
import Image from "next/image";
import Theme from "../components/theme";

const FirstNavbar = () => {
  return (
    <nav>
<div className="w-full absolute top-0 left-0 inline-flex items-center justify-between mdl:gap-3 px-16 pt-8">
        <div className="float-start">
          <Image src={logo} width={70} height={70} alt="Logo" />
        </div>

        <div className="float-end flex items-center space-x-4">
            <a className="text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-500" href="../practice"  >Practice</a>
            <Theme />

            <button className="relative w-20 h-8 flex items-center justify-center border cursor-pointer rounded-full border-light_theme dark:border-dark_theme hover:bg-gray-500 ">
                <a href="../login" className="text-black dark:text-white">Login</a>
            </button>
            <button className="relative w-20 h-8 flex items-center justify-center dark:bg-dark_theme hover:dark:bg-dark_theme_click bg-light_theme  hover:bg-light_theme_click cursor-pointer rounded-full">
                <a href="../register" className="text-black dark:text-white">Register</a>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default FirstNavbar;
