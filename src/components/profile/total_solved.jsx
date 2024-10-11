"use client";

export default function TotalSolved({ profile }) {
  const totalSolved =
    profile.solved.fundamental +
    profile.solved.medium +
    profile.solved.difficult;

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-white">Total Solved</h3>
        <div className="mt-4">
          <h1 className="text-6xl font-bold text-gray-100">{totalSolved}</h1>
        </div>
      </div>
    </div>
  );
}

