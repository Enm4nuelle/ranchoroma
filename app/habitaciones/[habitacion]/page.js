import JsonData from "../../../data/data.json";
import RoomsJson from "../../../data/rooms.json";
import PromoDetail from "@/components/promoDetail";
import { ImgWithLightBox } from "@/components/imgWithLightbox";
import ListFeatures from "@/components/listFeatures";
import BannerWithMessage from "@/components/bannerWithMessage";
import CarrouselRooms from "@/components/carrouselRooms";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const {habitacion} = await params
    const habitacionInfo = RoomsJson.rooms.find((room, index) => room.slug === habitacion);
    if (!habitacionInfo) return {};

    return {
        title: habitacionInfo.title,
        description: `Reserva la ${habitacionInfo.title} en Hotel Rancho Roma desde ${habitacionInfo.pricePerNight} por noche. ${habitacionInfo.basicInfo[0]?.text}. Incluye desayuno, aire acondicionado y acceso a piscina.`,
        alternates: {
            canonical: `/habitaciones/${habitacionInfo.slug}`,
        },
        openGraph: {
            title: `${habitacionInfo.title} | Rancho Roma`,
            description: `Reserva la ${habitacionInfo.title} en Hotel Rancho Roma desde ${habitacionInfo.pricePerNight} por noche.`,
            url: `${JsonData.urlDomain}habitaciones/${habitacionInfo.slug}`,
            images: [JsonData.ogImage],
        },
    };
}

export const HabitacionesDetail = async({params}) => {
    const { habitacion } = await params;
    const habitacionInfo = RoomsJson.rooms.find((room, index) => room.slug === habitacion);
    if(!habitacionInfo){
        notFound();
    }else if(!habitacionInfo.active){
        notFound();
    }
    const pages = [];

    const jsonLdRoom = {
        "@context": "https://schema.org",
        "@type": "HotelRoom",
        "name": habitacionInfo.title,
        "description": `${habitacionInfo.basicInfo[0]?.text}. Incluye ${habitacionInfo.features.map(f => f.text).slice(0, 5).join(', ')}.`,
        "image": habitacionInfo.imgs.map(img => `${JsonData.urlDomain.substring(0, JsonData.urlDomain.length - 1)}${img.src}`),
        "amenityFeature": habitacionInfo.features.map(f => ({
            "@type": "LocationFeatureSpecification",
            "name": f.text,
            "value": true
        })),
        "offers": {
            "@type": "Offer",
            "price": habitacionInfo.pricePerNight.replace("S/. ", ""),
            "priceCurrency": "PEN",
            "availability": "https://schema.org/InStock",
            "url": `${JsonData.urlDomain}habitaciones/${habitacionInfo.slug}`
        }
    };

    const breadcrumbRoom = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Habitaciones", "item": `${JsonData.urlDomain}habitaciones` },
            { "@type": "ListItem", "position": 3, "name": habitacionInfo.title, "item": `${JsonData.urlDomain}habitaciones/${habitacionInfo.slug}` }
        ]
    };

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRoom) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbRoom) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default HabitacionesDetail;