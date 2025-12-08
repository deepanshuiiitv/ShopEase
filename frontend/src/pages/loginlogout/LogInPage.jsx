import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch("/api/authenticate", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail: gmail,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.text();
      console.log("Login successful:", data);

      // Optionally store token or redirect user
      // localStorage.setItem("token", data.token);
      navigate("/account");
    } catch (err) {
      console.log("this ");
      console.error("Error:", err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed inset-0 z-21 flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Welcome to ShopEase
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              placeholder="example@gmail.com"
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/SignupPage">
            <p className="text-blue-600 hover:underline">Sign Up</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
