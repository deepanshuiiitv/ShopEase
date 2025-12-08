import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { orderInCartState } from "../../data/atoms/atoms";
import { GetUserId } from "../../data/Check";
import LoginPopUp from "./LoginPopUp";

export default function ProductCard({
  itemId,
  image,
  title,
  price,
  description,
  rating,
  onClick,
}) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const setOrderCart = useSetRecoilState(orderInCartState);
  const [modal, setModal] = useState(false);

  const handleLikedClick = () => setLiked(!liked);
  const handleOnConfirmModel = () => {
    setModal(false);
    navigate("/LoginPage");
  };
  const handleOnCancelModel = () => setModal(false);

  const handleAddToCartClick = async () => {
    const userId = GetUserId();
    if (!userId) {
      setModal(true);
      return;
    }

    const cartItem = {
      userId: Number(userId),
      addressId: "null",
      itemId: Number(itemId),
    };

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        const addedCartItem = await response.json();
        const newProduct = {
          itemId: addedCartItem.itemId,
          title: title,
          imageUrl: image,
          price: price,
          quantity: 1,
        };
        setOrderCart((prevCart) => [...prevCart, newProduct]);
        alert("Item added to cart successfully!");
      } else {
        const errorText = await response.text();
        alert("Failed to add to cart: " + errorText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding to cart.");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <div className="
        bg-white rounded-2xl p-4 
        w-[150px] h-[280px]
        sm:w-[180px] sm:h-[320px]
        md:w-[220px] md:h-[380px]
        lg:w-[240px] lg:h-[420px]
        flex flex-col justify-between 
        hover:shadow-lg transition overflow-hidden
      ">
        <div>
          <div className="relative h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] overflow-hidden rounded-xl">
            <Link to="/ProductPage">
              <img
                onClick={onClick}
                src={image}
                alt={title}
                className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </Link>
            <HeartButton liked={liked} handleClick={handleLikedClick} />
          </div>

          <div className="mt-3 sm:mt-4 space-y-1 overflow-hidden">
            <Link to="/ProductPage">
              <h3
                className="font-semibold text-sm sm:text-base truncate"
                onClick={onClick}
              >
                {title}
              </h3>
            </Link>

            <p className="text-gray-500 text-[10px] sm:text-xs line-clamp-2 leading-snug overflow-hidden">
              {description.split(" ").slice(0, 10).join(" ")}...
            </p>

            <div className="flex items-center text-green-600 font-bold text-xs sm:text-sm">
              {"★".repeat(rating)}
              <span className="text-black ml-1 sm:ml-2">({rating})</span>
            </div>

            <Link to="/ProductPage">
              <p
                className="text-base sm:text-lg font-bold"
                onClick={onClick}
              >
                ${price}
              </p>
            </Link>
          </div>
        </div>

        <button
          className="mt-3 border rounded-full w-full py-1 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>

      {modal && (
        <LoginPopUp
          message="Please Login First"
          onConfirm={handleOnConfirmModel}
          onCancel={handleOnCancelModel}
        />
      )}
    </>
  );
}

function HeartButton({ liked, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={liked ? "#ef4444" : "#ffffff"}
        stroke="#ef4444"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21C12 21 4 13.75 4 8.5C4 5.75 6 4 8.5 4C10 4 11.25 5 12 6C12.75 5 14 4 15.5 4C18 4 20 5.75 20 8.5C20 13.75 12 21 12 21Z"
        />
      </svg>
    </button>
  );
}
