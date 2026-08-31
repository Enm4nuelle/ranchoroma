import JsonData from "../../data/data.json";
import FormCotization from "@/components/formCotization";

export const PageConsultPrice = () => {
    const pages = [];
    for (const page of JsonData.pagesConsultPrice) {
        if (page.pageName === "FormCotization"){
            pages.push({e: <FormCotization data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default PageConsultPrice;