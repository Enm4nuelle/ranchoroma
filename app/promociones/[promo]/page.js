import JsonData from "../../../data/data.json";
import PromosJson from "../../../data/promociones.json";
import PromoDetail from "@/components/promoDetail";
import CarrouselTravels from "@/components/carrouselTravels";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const {promo} = await params
    const promoInfo = PromosJson.promotions.find((prom, index) => prom.slug === promo);
    if (!promoInfo) return {};

    return {
        title: promoInfo.title,
        description: promoInfo.description,
        alternates: {
            canonical: `/promociones/${promoInfo.slug}`,
        },
        openGraph: {
            title: `${promoInfo.title} | Rancho Roma`,
            description: promoInfo.description,
            url: `${JsonData.urlDomain}promociones/${promoInfo.slug}`,
            images: [JsonData.ogImage],
        },
    };
}

export const PromocionesDetail = async({params}) => {
    const { promo } = await params;
    const promoInfo = PromosJson.promotions.find((prom, index) => prom.slug === promo);
    if(!promoInfo){
        notFound();
    }else if(!promoInfo.active){
        notFound();
    }

    const jsonLdPromo = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": promoInfo.title,
        "description": promoInfo.description,
        "image": `${JsonData.urlDomain.substring(0, JsonData.urlDomain.length - 1)}${promoInfo.options[0].img}`,
        "brand": { "@type": "Brand", "name": "Hotel Rancho Roma" },
        "offers": {
            "@type": "Offer",
            "price": promoInfo.price,
            "priceCurrency": promoInfo.currency ?? "PEN",
            "availability": "https://schema.org/InStock",
            "url": `${JsonData.urlDomain}promociones/${promoInfo.slug}`,
            "seller": { "@type": "LodgingBusiness", "name": "Hotel Rancho Roma" }
        }
    };

    const breadcrumbPromo = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Paquetes", "item": `${JsonData.urlDomain}promociones` },
            { "@type": "ListItem", "position": 3, "name": promoInfo.title, "item": `${JsonData.urlDomain}promociones/${promoInfo.slug}` }
        ]
    };

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPromo) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbPromo) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default PromocionesDetail;