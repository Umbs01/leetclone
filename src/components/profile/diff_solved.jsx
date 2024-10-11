"use client";
import { VscCircleFilled } from "react-icons/vsc";

export default function Diff_solved({ profile }) {
  return (
    <div>
      <h3 className="text-lg text-white mt-4 font-semibold">Solved</h3>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <VscCircleFilled className="text-green-500" />
            <span className="ml-2 text-white">Fundamental</span>
          </div>
          <span className="text-white">{profile.solved.fundamental}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <VscCircleFilled className="text-yellow-500" />
            <span className="ml-2 text-white">Medium</span>
          </div>
          <span className="text-white">{profile.solved.medium}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <VscCircleFilled className="text-red-500" />
            <span className="ml-2 text-white">Difficult</span>
          </div>
          <span className="text-white">{profile.solved.difficult}</span>
        </div>
      </div>
    </div>
  );
}
