import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import ListParrafsWithImg from "@/components/listParrafsWithImg";

export const Brasil = () => {
    const pages = [];
    for (const page of JsonData.pagesBrasil) {
        if(page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "Carrousel"){
            pages.push({e: <Carrousel data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Brasil;