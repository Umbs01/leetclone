"use client";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profile_card";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import StatGraph from "@/components/profile/StatGraph";
import TotalSolved from "@/components/profile/total_solved";
import Score from "@/components/profile/score";
import Diff_solved from "@/components/profile/diff_solved";

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
      {/* Sidebar Toggle Button */}
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
          fixed lg:relative lg:w-1/5 h-screen
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
      <div className="flex-1 p-4 w-full overflow-x-hidden">
        <Header />
        <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row gap-4">
          {/* Profile Card */}
          <div className="w-full lg:w-1/3">
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow">
              <ProfileCard profile={profile} />
            </div>
          </div>

          {/* Stat Cards and Graph */}
          <div className="w-full lg:w-2/3 flex flex-col space-y-4">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#282828] rounded-lg shadow p-4">
                <TotalSolved profile={profile} />
              </div>
              <div className="bg-white dark:bg-[#282828] rounded-lg shadow p-4">
                <Diff_solved profile={profile} />
              </div>
              <div className="bg-white dark:bg-[#282828] rounded-lg shadow p-4 sm:col-span-2 lg:col-span-1">
                <Score profile={profile} />
              </div>
            </div>
              
            {/* Stat Graph */}
            <div className="bg-white dark:bg-[#282828] rounded-lg shadow h-[300px] lg:h-[400px] flex justify-center items-center p-4">
              <div className="w-full h-full flex justify-center items-center">
                <StatGraph profile={profile} />
              </div> 
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}