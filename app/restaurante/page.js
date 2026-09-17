import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ListParrafsWithImg from "@/components/listParrafsWithImg";
import FrequentQuestions from "@/components/frequentQuestions";
import CarrouselRooms from "@/components/carrouselRooms";
import DownloadMenus from "@/components/downloadMenus";

export const metadata = {
    title: "Restaurante y Bar",
    description: "Restaurante y Bar de Hotel Rancho Roma en Tarapoto: sabores de la selva peruana en cada plato. Ceviche mixto, lomo saltado, tacacho con cecina y cócteles de autor.",
    alternates: {
        canonical: "/restaurante",
    },
    openGraph: {
        title: "Restaurante y Bar | Rancho Roma",
        description: "Sabores de la selva peruana en cada plato. Descubre nuestra carta de comidas y cócteles en Tarapoto.",
        url: `${JsonData.urlDomain}restaurante`,
        images: [JsonData.ogImage],
    },
};

export const Restaurante = () => {
    const loc = JsonData.locationCompany;
    const jsonLdRestaurante = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Restaurante Rancho Roma",
        "image": `${JsonData.urlDomain}img/imagenesRestaurante/imagenPortada.webp`,
        "servesCuisine": "Peruana, Amazónica",
        "priceRange": "S/. 18 - S/. 150",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": loc.streetAddress,
            "addressLocality": loc.addressLocality,
            "addressRegion": loc.addressRegion,
            "postalCode": loc.postalCode,
            "addressCountry": loc.addressCountry,
        },
        "hasMenu": [
            {
                "@type": "Menu",
                "name": "Carta del Restaurante",
                "url": `${JsonData.urlDomain}img/imagenesRestaurante/Carta del Restaurante de Rancho Roma.pdf`
            },
            {
                "@type": "Menu",
                "name": "Carta del Bar",
                "url": `${JsonData.urlDomain}img/imagenesRestaurante/Carta del Bar de Rancho Roma.pdf`
            }
        ]
    };

    const breadcrumbRestaurante = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Restaurante", "item": `${JsonData.urlDomain}restaurante` }
        ]
    };

    const pages = [];
    for (const page of JsonData.pagesRestaurante) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FrequentQuestions"){
            pages.push({e: <FrequentQuestions data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "CarrouselRooms"){
            pages.push({e: <CarrouselRooms data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "DownloadMenus"){
            pages.push({e: <DownloadMenus data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRestaurante) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbRestaurante) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Restaurante;