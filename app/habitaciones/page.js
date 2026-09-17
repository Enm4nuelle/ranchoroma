import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import TransitionImagesAndText from "@/components/transitionImagesAndText";
import FormSendInfo from "@/components/formSendInfo";
import ConnectCountries from "@/components/connectCountries";
import OurMetrics from "@/components/ourMetrics";
import OurProcess from "@/components/ourProcess";
import ProductCatalog from "@/components/productCatalog";
import CarrouselTravels from "@/components/carrouselTravels";
import ListParrafsWithImg from "@/components/listParrafsWithImg";
import ListRooms from "@/components/listRooms";
import CardsPaymentsList from "@/components/cardsPaymentsList";

export const metadata = {
    title: "Suites y Habitaciones",
    description: "Conoce las suites de Hotel Rancho Roma en Tarapoto: Simple, Matrimonial, Doble y Triple. Aire acondicionado, desayuno y acceso a piscina, sala de juegos y campo deportivo.",
    alternates: {
        canonical: "/habitaciones",
    },
    openGraph: {
        title: "Suites y Habitaciones | Rancho Roma",
        description: "Conoce las suites de Hotel Rancho Roma en Tarapoto: Simple, Matrimonial, Doble y Triple.",
        url: `${JsonData.urlDomain}habitaciones`,
        images: [JsonData.ogImage],
    },
};

export const Habitaciones = () => {
    const pages = [];

    const breadcrumbListado = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Habitaciones", "item": `${JsonData.urlDomain}habitaciones` }
        ]
    };

    for (const page of JsonData.pagesHabitaciones) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ListRooms"){
            pages.push({e: <ListRooms data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
        }else if (page.pageName === "CardsPaymentsList"){
            pages.push({e: <CardsPaymentsList data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListado) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Habitaciones;