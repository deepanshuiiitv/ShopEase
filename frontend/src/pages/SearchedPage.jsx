import React from "react";
import demo from "@/assets/demo.png";
import ProductList from "@c/globalcomponent/ProductList";


const filters = [
  "Headphone Type",
  "Price",
  "Review",
  "Color",
  "Material",
  "Offer",
];

const SearchedPage = () => {
  return (
    <div className="p-6 bg-white font-sans">
      {/* Banner */}
      <div className="bg-[#f0e9dc] flex items-center justify-between p-6 rounded-xl mb-8 h-[250px]">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800">
            Grab Upto 50% Off On Selected Headphone
          </h2>
          <button className="mt-4 px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800">
            Buy Now
          </button>
        </div>
        <img
          src={demo}
          alt="Girl with headphones"
          className="hidden md:block w-44 rounded-xl"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100 transition"
          >
            {filter} <span className="ml-1">&#9662;</span>
          </button>
        ))}
        <button className="border px-4 py-1 rounded-full text-sm bg-gray-100 font-medium">
          All Filters
        </button>
        <div className="ml-auto">
          <select className="border px-4 py-1 rounded-full text-sm">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <h3 className="text-xl font-semibold mb-4">Headphones For You!</h3>
      <ProductList />
    </div>
  );
};

export default SearchedPage;
