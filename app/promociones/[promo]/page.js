import JsonData from "../../../data/data.json";
import ItinerarysJson from "../../../data/itinerarys.json";
import PromosJson from "../../../data/promociones.json";
import ItinerarysDetail from "@/components/itinerarysDetail";
import CarrouselTravels from "@/components/carrouselTravels";
import { notFound } from "next/navigation";

export const ItinerarioDetail = async({params}) => {
    const { promo } = await params;
    const travelInfo = PromosJson.promotions.find((prom, index) => prom.slug === promo);
    if(!travelInfo){
        notFound();
    }else if(!travelInfo.active){
        notFound();
    }
    const pages = [];
    for (const page of JsonData.pagesItinerarioDetail) {
        if (page.pageName === "ItinerarysDetail"){
            pages.push({e: <ItinerarysDetail data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "CarrouselTravels"){
            pages.push({e: <CarrouselTravels data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div style={{
            overflowY: "hidden"
        }}>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default ItinerarioDetail;