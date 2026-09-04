import JsonData from "../../../data/data.json";
import PromosJson from "../../../data/promociones.json";
import PromoDetail from "@/components/promoDetail";
import CarrouselTravels from "@/components/carrouselTravels";
import { notFound } from "next/navigation";

export const PromocionesDetail = async({params}) => {
    const { promo } = await params;
    const promoInfo = PromosJson.promotions.find((prom, index) => prom.slug === promo);
    if(!promoInfo){
        notFound();
    }else if(!promoInfo.active){
        notFound();
    }
    const pages = [];
    for (const page of JsonData.pagesPromocionesDetail) {
        if (page.pageName === "PromoDetail"){
            pages.push({e: <PromoDetail data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "CarrouselTravels"){
            pages.push({e: <CarrouselTravels data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default PromocionesDetail;