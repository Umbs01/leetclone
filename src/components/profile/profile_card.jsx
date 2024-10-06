"use client";
import { VscCircleFilled } from "react-icons/vsc";
import { SiVirustotal } from "react-icons/si";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-[#282828] text-white p-6 rounded-lg shadow-lg h-full">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="h-20 w-20 rounded-full bg-gray-600"></div>
      </div>

      {/* Username and Rank */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{profile.username}</h2>
        <h2 className="text-l font-bold">{profile.email}</h2>
        <button className="mt-2 bg-[#DF8D1E] px-4 py-2 rounded text-sm">
          Edit Profile
        </button>
      </div>

      {/* Problems Solved */}
      <div className="mt-6">
        <h3 className="text-sm text-gray-300">Solved</h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <VscCircleFilled className="text-green-500" />
              <span className="ml-2">Fundamental</span>
            </div>
            <span>{profile.solved.fundamental}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <VscCircleFilled className="text-yellow-500" />
              <span className="ml-2">Medium</span>
            </div>
            <span>{profile.solved.medium}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <VscCircleFilled className="text-red-500" />
              <span className="ml-2">Difficult</span>
            </div>
            <span>{profile.solved.difficult}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SiVirustotal className="text-green-400" />
              <span className="ml-2">Score</span>
            </div>
            <span>{profile.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
