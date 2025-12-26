import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingBag,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { orderInCartState } from "../../data/atoms/atoms";
import { GetUserId } from "../../data/Check";
import LoginPopUp from "./LoginPopUp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close mobile menu and search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const cartProductList = useRecoilValue(orderInCartState);
  const cartCount = cartProductList.length;

  
  const handleonCancelModel = () => setModal(!modal);
  const handleOnConfirmModel = () => {
    setModal(!modal);
    navigate("/LoginPage");
  };
  const handleAccountPage = () => {
    toggleMenu();
    if (GetUserId() === null) {
      setModal(!modal);
    } else {
      navigate("/account");
    }
  };
  const handleCart = () => {
    toggleMenu();
    if (GetUserId() === null) {
      setModal(!modal);
    } else {
      navigate("/CartCheckout");
    }
  };
  const handleMyOrder = () => {
    toggleMenu();
    if (GetUserId() === null) {
      setModal(!modal);
    } else {
      navigate("/Myorders");
    }
  };

  return (
    <>
      <header className=" sticky top-0 z-20 bg-white">
        {/* Top Strip */}
        <div className="bg-blue-900 text-white text-xs sm:text-sm flex justify-between items-center px-4 sm:px-6 py-2">
          <div className="flex items-center gap-2">
            <FaPhone className="hidden sm:block" aria-hidden="true" />
            <span>+0095456646645</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span>Get 30% Off on Selected Items</span>
            <a
              href="#"
              className="underline hover:text-blue-300 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 shadow relative">
          {/* Logo */}
          <div className="flex items-center gap-2 text-blue-800 text-lg sm:text-xl font-bold">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Shopcart logo"
                className="w-6 h-6 sm:w-8 sm:h-8"
                loading="lazy"
              />
              <span className="hidden sm:inline">ShopEase</span>
            </Link>
          </div>

          {/* Mobile Menu & Search Buttons */}
          <div className="flex items-center sm:hidden gap-4">
            <button
              onClick={toggleSearch}
              aria-label="Toggle search"
              className="text-gray-800 hover:text-blue-800 transition-colors"
            >
              <FaSearch size={20} />
            </button>
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-gray-800 hover:text-blue-800 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Nav Menu - Desktop */}
          <nav className="hidden sm:flex gap-4 lg:gap-6 text-gray-800 font-medium">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-800 transition-colors">
              Category <FaChevronDown className="text-xs" aria-hidden="true" />
            </div>
            <a href="#" className="hover:text-blue-800 transition-colors">
              Deals
            </a>
            <a href="#" className="hover:text-blue-800 transition-colors">
              What's New
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex items-center w-40 md:w-64 lg:w-96 mx-2">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search products"
            />
            <button
              className="bg-gray-200 px-4 py-2 rounded-r-full hover:bg-gray-300 transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>

          {/* Account & Cart - Desktop */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-gray-800">
            <p
              className="flex items-center gap-1 hover:text-blue-800 transition-colors"
              onClick={handleAccountPage}
            >
              <FaUser aria-hidden="true" />{" "}
              <span className="hidden md:inline">Account</span>
            </p>

            <p
              className="flex items-center gap-1 hover:text-blue-800 transition-colors"
              onClick={handleMyOrder}
            >
              <FaShoppingBag aria-hidden="true" />{" "}
              <span className="hidden md:inline">MyOrder</span>
            </p>

            <div
              className="flex items-center gap-1 hover:text-blue-800 transition-colors"
              onClick={handleCart}
            >
              <div className="relative">
                <FaShoppingCart aria-hidden="true" className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </div>
          </div>

          {/* Language & Location - Desktop */}
          <div className="hidden lg:flex items-center gap-4 ml-6 text-gray-800">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-800 transition-colors">
              Eng <FaChevronDown className="text-xs" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-800 transition-colors">
              Location <FaChevronDown className="text-xs" aria-hidden="true" />
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div
              ref={searchRef}
              className="absolute top-full left-0 right-0 bg-white p-4 shadow sm:hidden transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Search products"
                />
                <button
                  className="bg-gray-200 px-4 py-2 rounded-r-full hover:bg-gray-300 transition-colors"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav
              ref={menuRef}
              className="absolute top-full left-0 right-0 bg-white shadow-lg sm:hidden transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col p-4 space-y-4 text-gray-800">
                <p
                  onClick={handleAccountPage}
                  className="flex items-center gap-2 border-b pb-2 hover:text-blue-800 transition-colors"
                >
                  <FaUser aria-hidden="true" /> Account
                </p>
                <Link to="/CartCheckout">
                  <p
                    onClick={toggleMenu}
                    className="flex items-center gap-2 border-b pb-2 hover:text-blue-800 transition-colors"
                  >
                    <FaShoppingCart aria-hidden="true" /> Cart
                  </p>
                </Link>
                <div className="flex items-center gap-2 border-b pb-2 cursor-pointer hover:text-blue-800 transition-colors">
                  Category{" "}
                  <FaChevronDown className="text-xs" aria-hidden="true" />
                </div>
                <a
                  href="#"
                  className="border-b pb-2 hover:text-blue-800 transition-colors"
                >
                  Deals
                </a>
                <a
                  href="#"
                  className="border-b pb-2 hover:text-blue-800 transition-colors"
                >
                  What's New
                </a>
                <a
                  href="#"
                  className="border-b pb-2 hover:text-blue-800 transition-colors"
                >
                  Delivery
                </a>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-800 transition-colors">
                  Eng <FaChevronDown className="text-xs" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-800 transition-colors">
                  Location{" "}
                  <FaChevronDown className="text-xs" aria-hidden="true" />
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
      {modal && (
        <LoginPopUp
          message="Please Login First"
          onConfirm={handleOnConfirmModel}
          onCancel={handleonCancelModel}
        />
      )}
    </>
  );
}
