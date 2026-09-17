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
import CardsPaymentsList from "@/components/cardsPaymentsList";

export const metadata = {
    title: "Paquetes y Promociones",
    description: "Conoce los paquetes de Hotel Rancho Roma: 3 días/2 noches, 4 días/3 noches y celebraciones especiales en la selva de Tarapoto. Alojamiento, desayuno y acceso a todas nuestras instalaciones.",
    alternates: {
        canonical: "/promociones",
    },
    openGraph: {
        title: "Paquetes y Promociones | Rancho Roma",
        description: "Conoce los paquetes de Hotel Rancho Roma: 3 días/2 noches, 4 días/3 noches y celebraciones especiales en la selva de Tarapoto.",
        url: `${JsonData.urlDomain}promociones`,
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
};

export const Promociones = () => {
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Paquetes", "item": `${JsonData.urlDomain}promociones` }
        ]
    };

    const pages = [];
    for (const page of JsonData.pagesPromociones) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Promociones;