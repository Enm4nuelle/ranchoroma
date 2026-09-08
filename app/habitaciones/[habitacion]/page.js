import JsonData from "../../../data/data.json";
import RoomsJson from "../../../data/rooms.json";
import PromoDetail from "@/components/promoDetail";
import { ImgWithLightBox } from "@/components/imgWithLightbox";
import ListFeatures from "@/components/listFeatures";
import BannerWithMessage from "@/components/bannerWithMessage";
import CarrouselRooms from "@/components/carrouselRooms";
import { notFound } from "next/navigation";

export const HabitacionesDetail = async({params}) => {
    const { habitacion } = await params;
    const habitacionInfo = RoomsJson.rooms.find((room, index) => room.slug === habitacion);
    if(!habitacionInfo){
        notFound();
    }else if(!habitacionInfo.active){
        notFound();
    }
    const pages = [];
    for (const page of JsonData.pagesHabitacionesDetail) {
        if (page.pageName === "PromoDetail"){
            pages.push({e: <PromoDetail data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "ImgWithLightBox"){
            pages.push({e: <ImgWithLightBox data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "ListFeatures"){
            pages.push({e: <ListFeatures data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "BannerWithMessage"){
            pages.push({e: <BannerWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if(page.pageName === "CarrouselRooms"){
            pages.push({e: <CarrouselRooms data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default HabitacionesDetail;