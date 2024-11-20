'use client';

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Question from "@/components/question";
import withAuth from "../../hoc/withAuth";

function Practice() {
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
export default withAuth(Practice);
