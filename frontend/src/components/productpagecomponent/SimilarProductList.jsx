import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentProduct,
  productDataState1
} from "../../data/atoms/atoms";
import ProductCard from "../globalcomponent/ProductCard";

const SimilarProductList = () => {
  const products = useRecoilValue(productDataState1);
  const [currentproduct, setcurrentproduct] = useRecoilState(currentProduct);
  return (
    <div className="p-6 bg-gray-50 rounded-2xl my-4">
      <h1 className="text-3xl font-bold mb-6 pl-5">Similar Products</h1>
      <div className="overflow-x-auto whitespace-nowrap p-6 bg-gray-50 scrollbar-hide">
        <div className="inline-flex gap-6">
          {products.map((p, index) =>
            currentproduct.category === p.category ? (
              <ProductCard
                key={index}
                itemId={p.itemId}
                image={p.imageUrl}
                title={p.title}
                price={p.price}
                description={p.description}
                rating={p.rating}
                onClick={() => {
                  setcurrentproduct(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarProductList;
