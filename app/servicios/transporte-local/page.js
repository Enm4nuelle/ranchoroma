import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const TransporteLocal = () => {
    const pages = [];
    for (const page of JsonData.pagesTransporteLocal) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ImgWithDropdowns"){
            pages.push({e: <ImgWithDropdowns data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default TransporteLocal;