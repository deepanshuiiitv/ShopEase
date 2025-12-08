import React from "react";
import BannerCarousel from "@/components/homepagecomponent/BannerCarousel";
import FilterTab from "@/components/homepagecomponent/FilterTab";
import ProductList from "@/components/globalcomponent/ProductList";
import banner1 from "@/assets/banner1.png";

export default function Home() {
  return (
    <div>
      <BannerCarousel />

      <FilterTab />

      <ProductList />
      <div className="w-full">
        <div className="relative w-full h-64 md:h-96 mt-6 overflow-hidden rounded-xl">
          <img
            src={banner1}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
