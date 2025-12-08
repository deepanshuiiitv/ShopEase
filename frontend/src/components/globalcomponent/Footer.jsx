import React from "react";
import { FaHeart } from "react-icons/fa";

const footerSections = [
  {
    title: "SHOPPING",
    items: ["Men", "Women", "Kids", "Electronics", "Home & Living"],
  },
  {
    title: "CUSTOMER CARE",
    items: [
      "Contact Us",
      "FAQs",
      "Shipping Info",
      "Returns & Refunds",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "USEFUL LINKS",
    items: [
      "Blog",
      "Careers",
      "Affiliate Program",
      "Gift Cards",
      "Sell on ShopEase",
    ],
  },
];

const socialIcons = [
  { name: "Facebook", iconClass: "fab fa-facebook-f", link: "#" },
  { name: "Twitter", iconClass: "fab fa-twitter", link: "#" },
  { name: "Instagram", iconClass: "fab fa-instagram", link: "#" },
  { name: "YouTube", iconClass: "fab fa-youtube", link: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 px-6 py-10 text-sm ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item} className="cursor-pointer hover:underline">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-semibold mb-2">GET THE APP</h3>
          <div className="flex space-x-2 mt-2">
            <a href={null} aria-label={"Google Play"}>
              <i className={"fab fa-google-play"}></i>
            </a>
            <a href={null} aria-label={"App Store"}>
              <i className={"fab fa-app-store-ios"}></i>
            </a>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-1">FOLLOW US</h4>
            <div className="flex space-x-4 text-lg">
              {socialIcons.map(({ name, iconClass, link }) => (
                <a key={name} href={link} aria-label={name}>
                  <i className={iconClass}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
        <p className="mt-1">
          Made with <FaHeart className="text-red-600 text-l inline" /> by{" "}
          <span className="font-bold">Deepanshu Verma</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
