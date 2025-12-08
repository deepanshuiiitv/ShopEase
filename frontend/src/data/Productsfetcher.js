import { useRecoilState } from "recoil"
import { productDataState1} from "./atoms/atoms"
import { useEffect } from "react"

export const Productsfetcher = () => {
    const [, setProductList1] = useRecoilState(productDataState1)

    useEffect(() => {
        fetchproductlist();
    }, []);

    const fetchproductlist = async () => {
        const res1 = await fetch('/api/products/all');
        const data1 = await res1.json();
        const converteddata1 = convertproductmodel1(data1);
        setProductList1(converteddata1);
    }

    const convertproductmodel1 = (data) => {
        const productlists = data.map((item) => ({
            itemId: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            rating: item.rating.rate,
            category: item.category,
            imageUrl: item.image
        }));
        return productlists;
    }

    return null;
}

