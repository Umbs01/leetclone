// "use client";
// import { useEffect, useState } from "react";
// import ProfileCard from "@/components/profile_card";
// import Header from "@/components/header";
// import Sidebar from "@/components/sidebar";
// import StatGraph from "@/components/StatGraph";

// export default function Profile() {
//   const [profile, setProfile] = useState({
//     username: "Loading...",
//     rank: 0,
//     solved: {
//       fundamental: 0,
//       medium: 0,
//       difficult: 0,
//     },
//     score: 0,
//   });

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // sample data
//         const data = {
//           username: "Arhway2000",
//           rank: 5,
//           solved: {
//             fundamental: 7,
//             medium: 12,
//             difficult: 3,
//           },
//           score: 1500,
//         };
//         setProfile(data);
//       } catch (error) {
//         console.error("Error fetching profile data", error);
//       }
//     };
//     fetchProfileData();
//   }, []);

//   return (
//     //     <div className="flex flex-col lg:flex-row min-h-screen">
//     //   <div
//     //     id="left"
//     //     className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r border-light_theme dark:border-dark_theme"
//     //   >
//     //     <Sidebar />
//     //   </div>
//     //   <div id="right" className="w-full lg:w-3/4 p-4">
//     //     <Header />
//     //     <div className="mt-8 lg:mt-24 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//     //       <div className="w-full lg:w-1/3">
//     //         <ProfileCard profile={profile} />
//     //       </div>
//     //       <div className="w-full lg:w-2/3">
//     //         <StatGraph profile={profile} />
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     <div className="flex flex-col md:flex-row h-screen">
//       <div
//         id="left"
//         className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-light_theme dark:border-dark_theme"
//       >
//         <Sidebar />
//       </div>
//       <div id="right" className="w-full md:w-3/4 p-4">
//         <Header />
//         <div className="mt-24 flex flex-col md:flex-row md:space-x-8">
//           <ProfileCard profile={profile} />
//           <div className="flex-auto">
//             <StatGraph profile={profile} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profile_card";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import StatGraph from "@/components/profile/StatGraph";


export default function Profile() {
 const [profile, setProfile] = useState({
    username: "Loading...",
    email: "",
    solved: {
      fundamental: 0,
      medium: 0,
      difficult: 0,
    },
    score: 0,
  }); 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // sample data
        const data = {
          username: "Arhway2000",
          email: "Arhway2000@gmail.com",
          solved: {
            fundamental: 7,
            medium: 12,
            difficult: 3,
          },
          score: 1500,
        };
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-700 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative w-[20%] h-screen
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none transition-transform duration-300 ease-in-out
          bg-white dark:bg-gray-950 z-40
          border-r border-light_theme dark:border-dark_theme
        `}
      >
        <div className="p-4 overflow-y-auto h-full">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:w-3/4">
        <div className="p-4">
          <Header />
          <div className="mt-16 lg:mt-24 space-y-4 lg:space-y-0 lg:flex lg:space-x-8">
            <div className="lg:w-1/4">
              <ProfileCard profile={profile} />
            </div>
            <div className="lg:w-2/3">
              <StatGraph profile={profile} />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}