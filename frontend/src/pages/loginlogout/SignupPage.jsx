import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!fullname || !phone || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/user/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          gmail: email,
          password,
        }),
      });

      const message = await response.text(); // 👈 Read plain text response

      if (response.ok) {
        alert(message || "Account created successfully!");
        navigate("/account");
      } else {
        alert(message || "Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-21 flex items-center justify-center bg-gray-100 px-4 p-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Create Your ShopEase Account
        </h2>

        <form onSubmit={handleCreateAccount} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/LogInPage">
            <span className="text-blue-600 hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
