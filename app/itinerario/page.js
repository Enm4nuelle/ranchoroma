import JsonData from "../../data/data.json";
//import ItinerarysJson from "../data/itinerarys.json"
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import TransitionImagesAndText from "@/components/transitionImagesAndText";
import FormSendInfo from "@/components/formSendInfo";
import ConnectCountries from "@/components/connectCountries";
import OurMetrics from "@/components/ourMetrics";
import OurProcess from "@/components/ourProcess";
import ProductCatalog from "@/components/productCatalog";
import CarrouselTravels from "@/components/carrouselTravels";
import ItinerarysDetail from "@/components/itinerarysDetail";

export const Itinerario = () => {
    const pages = [];
    for (const page of JsonData.pagesItinerario) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "Carrousel"){
            pages.push({e: <Carrousel data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
        }else if (page.pageName === "ItinerarysDetail"){
            pages.push({e: <ItinerarysDetail data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Itinerario;