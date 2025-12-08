import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCartNotice() {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto  text-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Order Summary
      </h2>

      <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg p-4">
        <p className="font-medium">Your total is $0.00</p>
        <p className="text-sm mt-1">Please add some items to proceed.</p>
      </div>
      <Link to="/">
        <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
          Add Items
        </button>
      </Link>
    </div>
  );
}
