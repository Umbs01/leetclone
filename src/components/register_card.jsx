"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterCard() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    student_id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handlestudentIDInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, student_id: value });
  };

  const validateForm = () => {
    let formErrors = {};

    const { username, email, password, student_id } = formData;

    if (!username) {
      formErrors.username = "Username is required";
    } else if (username.length < 3) {
      formErrors.username = "Username must be at least 3 characters";
    }

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    if (!student_id) {
      formErrors.student_id = "Student ID is required";
    } else if (student_id.length !== 8) {
      formErrors.student_id = "Student ID must be 8 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid");
      try {
        const response = await fetch("http://161.246.5.48:3777/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          alert("Register successful: " + data.message);
          console.log("success", data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            placeholder="username"
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]`}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="student_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Student ID
          </label>
          <input
            placeholder="Student ID"
            type="text"
            id="student_id"
            onInput={handlestudentIDInput}
            value={formData.student_id}
            className={`w-full px-3 py-2 border ${
              errors.student_id ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]`}
            required
          />
          {errors.student_id && (
            <p className="text-red-500 text-sm">{errors.student_id}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#DF8E1D]`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#DF8E1D] text-white font-bold rounded-full focus:outline-none focus:ring-2"
        >
          Sign up
        </button>
      </form>
      <div>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#DF8E1D] font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
