"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/question");
    } else {
      console.log("No token found");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://161.246.5.48:3777/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Login successful: Redirecting to home page");
        localStorage.setItem("token", data.token);
        router.push("/question");

      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}. Please check your email and password`);
        console.error("Login Error: ", errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#DF8E1D] text-white font-bold rounded-full focus:outline-none focus:ring-2">Login</button>
      </form>
      <div>
        <p className="text-center mt-4">Don&apos;t have an account? <Link href="/register" className="text-[#DF8E1D] font-bold">Sign up</Link></p>
      </div>
    </div>
  );
}
