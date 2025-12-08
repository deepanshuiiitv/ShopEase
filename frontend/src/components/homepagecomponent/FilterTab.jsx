import React from "react";
import { Button } from "@/components/homepagecomponent/Button";

const list=[
        "Wardrobe Refresh Sale",
        "Trending",
        "Coupons",
        "Lightning Deals",
        "Mobiles",
        "Electronics",
        "Mobiles & computer accessories",
        "Large Appliances",];

export default function FilterTab() {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 text-sm font-medium">
      {list.map((label) => (
        <Button variant="outline" key={label}>
          {label}
        </Button>
      ))}
    </div>
  );
}
