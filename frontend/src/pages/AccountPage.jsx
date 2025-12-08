import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetUserId } from "../data/Check";


export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // store fetched user


  useEffect(() => {
    const fetchUser = async () => {
      const userId = GetUserId();

      if (!userId) {
        console.error("User ID not found in cookies");
        return;
      }

      try {
        const response = await fetch("/api/user/getbyid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId}),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/LoginPage");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 sm:px-12">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <FaUserCircle className="text-blue-800 text-4xl" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
            <p className="text-sm text-gray-500">
              Welcome back, {user.fullname}!
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{user.fullname}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="font-medium">Phone Number:</span>
            <span>{user.phoneNumber}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user.gmail}</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-right">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
