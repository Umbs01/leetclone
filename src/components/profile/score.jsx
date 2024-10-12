"use client";
import { SiVirustotal } from "react-icons/si";

export default function Score({ profile }) {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="p-4 w-1/3 flex flex-col justify-center items-center h-40">
        <h3 className="text-xl font-semibold dark:text-white">Score</h3>
        <div className="mt-4 flex justify-center items-center">
          <SiVirustotal className="text-4xl text-green-500 mr-2" />
          <h1 className="text-6xl font-bold dark:text-gray-100">{profile.score}</h1>
        </div>
      </div>
    </div>
  );
}
