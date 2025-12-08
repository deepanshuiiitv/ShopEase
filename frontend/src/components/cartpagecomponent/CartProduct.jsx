import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { orderInCartState, totalAmountState } from "../../data/atoms/atoms";
import { GetUserId } from "../../data/Check"; // Assume this returns userId from cookie

export default function CartProduct() {
  const [cartProductList, setCartProductList] =
    useRecoilState(orderInCartState);
  const setTotal = useSetRecoilState(totalAmountState);
  const [loading, setLoading] = useState(true);

  const handleQuantityChange = (productId, delta) => {
    setCartProductList((prevList) =>
      prevList
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        const userId = GetUserId();

        const res = await fetch("/api/carts/userid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        });

        const cartItems = await res.json();
        console.log("🛒 Cart Items:", cartItems);

        const fullCartData = await Promise.all(
          cartItems.map(async (item) => {
            console.log("item check",item);
            const productRes = await fetch("/api/products/byid", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: item.itemId }),
            });
            const product = await productRes.json();
            console.log("📦 Product Fetched:", product);

            return {
              productId: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.image,
              quantity: 1,
            };
          })
        );

        setCartProductList(fullCartData);
        setTotal(calculateTotalAmount(fullCartData));
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndProducts();
  }, []);

  useEffect(() => {
    setTotal(calculateTotalAmount(cartProductList));
  }, [cartProductList]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {cartProductList.map((product) => (
        <div
          key={product.productId}
          className="bg-white rounded-xl shadow-sm p-6 flex gap-6 items-center"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-24 h-24 rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-800 font-semibold mt-2">
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="font-medium">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                <button
                  className="text-lg text-gray-300 hover:text-gray-800 px-1"
                  onClick={() => handleQuantityChange(product.productId, -1)}
                >
                  −
                </button>
                <span className="px-3 text-gray-900 font-semibold">
                  {product.quantity.toString().padStart(2, "0")}
                </span>
                <button
                  className="text-lg text-gray-300 hover:text-gray-800 px-1"
                  onClick={() => handleQuantityChange(product.productId, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const calculateTotalAmount = (products) => {
  return products.reduce((total, product) => {
    return total + (product.price || 0) * (product.quantity || 1);
  }, 0);
};
