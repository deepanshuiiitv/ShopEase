import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentProduct,
  productDataState1,
} from "../../data/atoms/atoms";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = useRecoilValue(productDataState1);
  const setcurrentproduct = useSetRecoilState(currentProduct);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 bg-gray-50 justify-items-center">
      {products != null &&
        products.map((p, index) => (
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
            }}
          />
        ))}
    </div>
  );
};

export default ProductList;
