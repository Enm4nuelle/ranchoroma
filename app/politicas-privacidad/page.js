import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ListParrafsWithImg from "@/components/listParrafsWithImg";
import FrequentQuestions from "@/components/frequentQuestions";

export const PoliticasPrivacidad = () => {
    const pages = [];
    for (const page of JsonData.pagesPoliticasPrivacidad) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FrequentQuestions"){
            pages.push({e: <FrequentQuestions data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default PoliticasPrivacidad;