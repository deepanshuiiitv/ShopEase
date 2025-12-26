import CartProduct from "@/components/cartpagecomponent/CartProduct";
import SummaryInCart from "@/components/cartpagecomponent/SummaryInCart";
import { useRecoilState } from "recoil";
import OrderSuccessModal from "../components/cartpagecomponent/OrderSuccessModal";
import { orderSuccessModal } from "../data/atoms/atoms";

export default function CartCheckout() {
  const [ordersuccessmodal, setordersuccessmodal] =
    useRecoilState(orderSuccessModal);

  return (
    <>
      {ordersuccessmodal === false ? (
        <div className="bg-gray-50 min-h-screen p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-6">
              {/* Breadcrumb */}
              <p className="text-sm text-gray-500">
                Home / <span className="text-black font-medium">Checkout</span>
              </p>
              {/* Product Review */}
              <CartProduct />
            </div>
            {/* Right Side */}
            <SummaryInCart />
          </div>
        </div>
      ) : (
        <OrderSuccessModal
          transactionId="83443294820"
          onClose={() => setordersuccessmodal(false)}
        />
      )}
    </>
  );
}
