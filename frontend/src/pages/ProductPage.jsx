import ProductSpecs from "@/components/productpagecomponent/ProductSpecs";
import SimilarProductList from "@/components/productpagecomponent/SimilarProductList";
import ProductInfo from "@/components/productpagecomponent/ProductInfo";
import ProductPhoto from "@/components/productpagecomponent/ProductPhoto";

export default function ProductPage() {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Image Section */}
        <div>
          {/* <nav className="text-sm text-gray-500 mb-5">
            Electronics / Audio / Headphones / <strong>airpods-max</strong>
          </nav> */}
          <ProductPhoto/>
        </div>

        {/* Right Content Section */}
        <ProductInfo/>

        {/* Below */}
        <div className="col-span-1 md:col-span-2 ">
          <ProductSpecs />
          <SimilarProductList />
        </div>
      </div>
    </div>
  );
}
