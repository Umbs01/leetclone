"use client";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-[#282828] text-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-center">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="h-24 w-24 rounded-full bg-gray-600"></div>
      </div>

      {/* Username and Rank */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{profile.username}</h2>
        <h2 className="text-l font-bold">{profile.email}</h2>
        <button className="mt-4 bg-[#DF8D1E] px-4 py-2 rounded text-sm">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
