import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Theme from "../components/theme";
import FirstNav from "../components/firstnavbar";

export default function Home() {

  return (
    <>
      <div className="flex h-screen">
        <div id="left" className="w-[20%]  p-4 border-r  border-light_theme dark:border-dark_theme">
          <Sidebar />
        </div>

        <div id="right" className="w-[80%] p-4">
          <Header />
          <div className="mt-4">
          </div>
        </div>
      </div>
    </>
  );
}
// import Image from "next/image";
// import styles from "./page.module.css";
// import Header from "../components/header";
// import Sidebar from "../components/sidebar";
// import Theme from "../components/theme";
// import FirstNav from "../components/firstnavbar";
// export  default function Home() {
//   return(
//     <>
//       <FirstNav />
//     </>
//   )
// }