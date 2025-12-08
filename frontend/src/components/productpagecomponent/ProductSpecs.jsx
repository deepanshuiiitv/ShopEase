import React from "react";
import { useRecoilValue } from "recoil";
import { currentProduct } from "../../data/atoms/atoms";

const ProductSpecs = () => {
  const numbers = [1, 2, 3, 4, 5,6,7,8];
  const currentproduct=useRecoilValue(currentProduct);
  return (
    <div className="bg-gray-100 p-12 text-gray-800 rounded-2xl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {currentproduct.title} Full Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">General</h2>
            <div className="space-y-2">
              {numbers.map((num, index) => (
                <SpecItem key={index} label="-----" value="-----" />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Product details</h2>
            <div className="space-y-2">
              {numbers.map((num, index) => (
                <SpecItem key={index} label="-----" value="-----" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default ProductSpecs;
