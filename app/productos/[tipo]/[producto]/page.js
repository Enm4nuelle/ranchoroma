
import JsonData from "../../../../data/data.json";
//import ProductsJson from "../data/products.json";
import ProductInfo from "@/components/productInfo";
import NoFoundProductConsult from "@/components/noFoundProductConsult";

export const DetailProduct = () => {
    const pages = [];
    for (const page of JsonData.pagesDetailProduct) {
        if (page.pageName === "ProductInfo"){
            pages.push({e: <ProductInfo data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "NoFoundProductConsult"){
            pages.push({e: <NoFoundProductConsult data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default DetailProduct;