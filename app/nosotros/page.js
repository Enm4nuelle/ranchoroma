import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import TeamShowCase from "@/components/teamShowCase";
import ImgWithHighLigths from "@/components/imgWithHighLights";
import VideoAndText from "@/components/videoAndText";
import GalleryAndList from "@/components/galleryAndList";
import Awards from "@/components/awards";
import MapWithText from "@/components/mapWithText";
import OurCompanies from "@/components/ourCompanies";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import TransitionImagesAndText from "@/components/transitionImagesAndText";
import FormSendInfo from "@/components/formSendInfo";
import ConnectCountries from "@/components/connectCountries";
import OurMetrics from "@/components/ourMetrics";
import OurProcess from "@/components/ourProcess";
import ProductCatalog from "@/components/productCatalog";
import CarrouselTravels from "@/components/carrouselTravels";
import CarrouselTestimonies from "@/components/carrouselTestimonies";
import ListParrafsWithImg from "@/components/listParrafsWithImg";
import TeamPersonsList from "@/components/teamPersonsList";
import VideoImgsText from "@/components/videoImgsText";


export const Nosotros = () => {
    const pages = [];
    for (const page of JsonData.pagesNosotros) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
        }else if (page.pageName === "Awards"){
            pages.push({e: <Awards data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "MapWithText"){
            pages.push({e: <MapWithText data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurCompanies"){
            pages.push({e: <OurCompanies data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FloatingWhatsapp"){
            pages.push({e: <FloatingWhatsapp data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FormSendInfo"){
            pages.push({e: <FormSendInfo data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "TransitionImagesAndText"){
            pages.push({e: <TransitionImagesAndText data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ConnectCountries"){
            pages.push({e: <ConnectCountries data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurMetrics"){
            pages.push({e: <OurMetrics data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurProcess"){
            pages.push({e: <OurProcess data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ProductCatalog"){
            pages.push({e: <ProductCatalog data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "CarrouselTravels"){
            pages.push({e: <CarrouselTravels data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "VideoImgsText"){
            pages.push({e: <VideoImgsText data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "CarrouselTestimonies"){
            pages.push({e: <CarrouselTestimonies data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "TeamPersonsList"){
            pages.push({e: <TeamPersonsList data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Nosotros;