import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Theme from "@/components/theme";
import FirstNav from "@/components/firstnavbar";
import Question from "@/components/question";

export default function Home() {
  return (
    <>
      <div className="flex h-screen">
        <div id="left" className="w-[20%] p-4 border-r border-light_theme dark:border-dark_theme">
          <Sidebar />
        </div>
        <div id="right" className="w-[80%] p-4 overflow-y-auto"> {/* Added overflow-y-auto */}
          <Header/>
          <div className=" scroll-smooth">
            <Question />
          </div>
        </div>
      </div>
    </>
  );
}
