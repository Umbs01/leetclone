"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlestudentIDInput = (e) => {
        const value = e.target.value;
        e.target.value = value.replace(/[^0-9]/g, '');
    }

    return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            placeholder="username"
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
            required
          />
        </div> 
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input
            placeholder="Student ID"
            type="text"
            id="student_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
            onInput={handlestudentIDInput}
            required
          />
        </div> 
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#DF8E1D] text-white font-bold rounded-full focus:outline-none focus:ring-2">Sign up</button>
      </form>
      <div>
        <p className="text-center mt-4">Already have an account? <Link href="/login" className="text-[#DF8E1D] font-bold">Sign in</Link></p>
      </div>
    </div>
    );
}
