import { useRecoilValue } from "recoil";
import { totalAmountState } from "../../data/atoms/atoms";
import EmptyCartNotice from "./EmptyCartNotice";
import NotEmptyCart from "./NotEmptyCart";

export default function SummaryInCart() {
  const price = useRecoilValue(totalAmountState);

  const total = price + price * 0.1 - price * 0.43;
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 max-w-2xl mx-auto mt-10">
      {total === 0 ? <EmptyCartNotice /> : <NotEmptyCart />}
    </div>
  );
}
