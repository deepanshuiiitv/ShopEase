import { useRecoilValue } from "recoil";
import { currentProduct } from "../../data/atoms/atoms";

export default function ProductPhoto() {
  const currentproduct = useRecoilValue(currentProduct);
  return (
    <div>
      <img
        src={currentproduct.imageUrl}
        alt="Airpods Max"
        className="h-120 object-cover rounded-md"
      />
      <div className="flex gap-4 mt-4">
        {[currentproduct.imageUrl].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index}`}
            className="w-20 h-20 rounded-lg border cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
