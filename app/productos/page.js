import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import TeamShowCase from "@/components/teamShowCase";
import ImgWithHighLigths from "@/components/imgWithHighLights";
import VideoAndText from "@/components/videoAndText";
import GalleryAndList from "@/components/galleryAndList";
import OurCompanies from "@/components/ourCompanies";
import FormSendInfo from "@/components/formSendInfo";
import ConnectCountries from "@/components/connectCountries";
import OurMetrics from "@/components/ourMetrics";
import OurProcess from "@/components/ourProcess";
import ProductCatalog from "@/components/productCatalog";
import NoFoundProductConsult from "@/components/noFoundProductConsult";


export const TypeProducts = () => {
    const pages = [];
    for (const page of JsonData.pagesTypeProducts) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "Carrousel"){
            pages.push({e: <Carrousel data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "TeamShowCase"){
            pages.push({e: <TeamShowCase data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ImgWithHighLigths"){
            pages.push({e: <ImgWithHighLigths data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "VideoAndText"){
            pages.push({e: <VideoAndText data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "GalleryAndList"){
            pages.push({e: <GalleryAndList data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurCompanies"){
            pages.push({e: <OurCompanies data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FormSendInfo"){
            pages.push({e: <FormSendInfo data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ConnectCountries"){
            pages.push({e: <ConnectCountries data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurMetrics"){
            pages.push({e: <OurMetrics data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurProcess"){
            pages.push({e: <OurProcess data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ProductCatalog"){
            pages.push({e: <ProductCatalog data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
export default TypeProducts;