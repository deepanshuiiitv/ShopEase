import dc from "@/assets/cards/dc.png";
import gp from "@/assets/cards/gp.png";
import pp from "@/assets/cards/pp.png";
import { GetUserId } from "../../data/Check";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  orderInCartState,
  orderSuccessModal,
  totalAmountState,
} from "../../data/atoms/atoms";
import PaymentInput from "./PaymentInput";

export default function NotEmptyCart() {
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const price = useRecoilValue(totalAmountState);
  const setCartProductList = useSetRecoilState(orderInCartState);
  const [ordersuccessmodel, setordersuccessmodel] =
    useRecoilState(orderSuccessModal);
  const paymentMethods = [
    { id: "cod", label: "Cash on Delivery" },
    { id: "shopcart", label: "ShopEase Card" },
    { id: "paypal", label: "Paypal" },
    { id: "card", label: "Credit or Debit card", defaultChecked: true },
  ];

  const summaryItems = [
    { label: "Sub Total", value: `$${price.toFixed(2)}` },
    { label: "Tax(10%)", value: `$${(price * 0.1).toFixed(2)}` },
    { label: "Coupon Discount", value: `$${(price * 0.43).toFixed(2)}` },
    { label: "Shipping Cost", value: "$0.00" },
  ];
  const handleOnClickPay = async () => {
    const userId = GetUserId();
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }), // matches your IdDto structure
      });

      if (!response.ok) {
        alert("Order creation failed");
        throw new Error("Order creation failed");
      }

      const order = await response.json();
      alert("Order placed successfully! Order ID: " + order.orderId);

      setCartProductList([]);
      setordersuccessmodel(true);
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  const total = price + price * 0.1 - price * 0.43;
  return (
    <div>
      <h3 className="text-xl font-semibold">Order Summary</h3>

      {/* Coupon */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="border rounded-md px-3 py-2 flex-1 text-sm"
        />
        <button className=" text-white px-4 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-500">
          Apply coupon
        </button>
      </div>

      {/* Payment Options */}
      <div>
        <h4 className="text-md font-semibold mb-2">Payment Details</h4>
        <div className="space-y-2 text-sm">
          {paymentMethods.map(({ id, label, defaultChecked }) => (
            <label key={id} className="block">
              <input
                type="radio"
                name="payment"
                checked={selectedMethod === id}
                onChange={() => setSelectedMethod(id)}
              />{" "}
              {label}
            </label>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <img src={gp} alt="Google pay" className="h-10" />
          <img src={pp} alt="MasterCard" className="h-10" />
          <img src={dc} alt="Debit Card" className="h-10" />
        </div>
      </div>

      {/* Payment Inputs */}
      {selectedMethod !== "cod" && <PaymentInput />}

      {/* Summary Breakdown */}
      <div className="text-sm text-gray-700 space-y-1">
        {summaryItems.map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>= ${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        className="w-full text-white py-3 my-4 rounded-xl font-medium text-lg bg-blue-600 hover:bg-blue-500"
        onClick={handleOnClickPay}
      >
        Pay ${total.toFixed(2)}
      </button>

      {/* Cashback Card */}
      <div className="bg-[#fdf4eb] text-sm p-4 rounded-md">
        <span className="font-semibold text-blue-800">Earn 5% cash back</span>{" "}
        on ShopEase <br />
        <a href="#" className="text-blue-700 underline text-sm">
          Learn More
        </a>
      </div>
    </div>
  );
}
