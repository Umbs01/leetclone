"use client";
import Image from "next/image";

export default function ProfileCard({ profile }) {
  return (
    <div className="dark:bg-[#282828] dark:text-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-center">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <Image src={"/profile_pic.png"} alt="User" width={100} height={100} className='rounded-full' />
      </div>

      {/* Username and Rank */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{profile.username}</h2>
        <h2 className="text-l font-bold">{profile.email}</h2>
        <button className="mt-4 bg-[#DF8D1E] px-4 py-2 rounded text-sm text-white">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
