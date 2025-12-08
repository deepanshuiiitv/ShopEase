import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentProduct } from "../../data/atoms/atoms";
import { useSetRecoilState } from "recoil";
import { orderInCartState } from "../../data/atoms/atoms";
import { GetUserId } from "../../data/Check";
import LoginPopUp from "../globalcomponent/LoginPopUp";
import { useNavigate } from "react-router-dom";

export default function ProductInfo() {
  const currentproduct = useRecoilValue(currentProduct);
  const [count, setcount] = useState(0);
  const setOrderCart = useSetRecoilState(orderInCartState);
  const navigate = useNavigate();

  useEffect(() => {
    setcount((count) => 0);
  }, [currentproduct]);

  const newProduct = {
    productId: currentproduct.productId,
    title: currentproduct.title,
    imageUrl: currentproduct.imageUrl,
    price: currentproduct.price,
    quantity: 1,
  };

  const [modal, setModal] = useState(false);
  const handleOnConfirmModel = () => {
    setModal(!modal);
    navigate("/LoginPage");
  };
  const handleonCancelModel = () => setModal(!modal);
  const handleAddtoCartClick = async () => {
    const userId = GetUserId();
    if (!userId) {
      setModal(true);
      return;
    }

    const cartItem = {
      userId: Number(userId),
      addressId: "null", // Or provide real address if available
      itemId: Number(currentproduct.itemId),
    };

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        // const addedCartItem = await response.json();
        // const newProduct = {
        //   itemId: currentproduct.itemId,
        //   title: currentproduct.title,
        //   imageUrl: currentproduct.imageUrl,
        //   price: currentproduct.price,
        //   quantity: 1,
        // };
        // setOrderCart((prevCart) => [...prevCart, newProduct]);
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
  let userId = GetUserId();
  const handleBuyNowClick = () => {
    if (userId === null) {
      setModal(!modal);
    } else {
      handleAddtoCartClick();
      navigate("/CartCheckout");
    }
  };
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{currentproduct.title}</h1>
        <p className="text-gray-600">{currentproduct.description}</p>

        <div className="flex items-center gap-2">
          <span className="text-green-600 text-sm">
            {"★".repeat(currentproduct.rating)}{" "}
          </span>
          <span className="text-sm text-gray-500">{currentproduct.rating}</span>
        </div>

        <p className="text-xl font-semibold">${currentproduct.price}</p>
        <p className="text-sm text-gray-500">
          Suggested payments with 6 months special financing
        </p>

        {/* Quantity & Buttons */}
        {count != 0 && (
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border px-3 py-1 rounded-full">
              <button
                className="text-xl"
                onClick={() => {
                  setcount((count) => count - 1);
                }}
              >
                −
              </button>
              <span className="px-3">{count}</span>
              <button
                className="text-xl"
                onClick={() => {
                  setcount((count) => count + 1);
                }}
              >
                +
              </button>
            </div>
            <span className="text-orange-600 text-sm font-medium">
              Only 12 Items Left!
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full"
            onClick={handleBuyNowClick}
          >
            Buy Now
          </button>
          <button
            className="border border px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-500"
            onClick={
              handleAddtoCartClick
              // setcount((count) => count + 1);
            }
          >
            Add to Cart
          </button>
        </div>

        {/* Delivery Info */}
        <div className="border p-4 mt-6 rounded-xl space-y-2 text-sm">
          <div>
            <strong>🚚 Free Delivery</strong>
            <p className="underline">
              Enter your Postal code for Delivery Availability
            </p>
          </div>
          <div>
            <strong>↩️ Return Delivery</strong>
            <p>
              Free 30days Delivery Returns.{" "}
              <span className="underline ">Details</span>
            </p>
          </div>
        </div>
      </div>
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
