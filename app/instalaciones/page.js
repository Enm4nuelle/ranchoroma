import JsonData from "../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import Carrousel from "@/components/carrousel";
import TeamShowCase from "@/components/teamShowCase";
import ImgWithHighLigths from "@/components/imgWithHighLights";
import VideoAndText from "@/components/videoAndText";
import GalleryAndList from "@/components/galleryAndList";
import OurCompanies from "@/components/ourCompanies";
import FormSendInfo from "@/components/formSendInfo";
import ConnectCountries from "@/components/connectCountries";
import OurMetrics from "@/components/ourMetrics";
import OurProcess from "@/components/ourProcess";
import ProductCatalog from "@/components/productCatalog";
import NoFoundProductConsult from "@/components/noFoundProductConsult";
import ListParrafsWithImg from "@/components/listParrafsWithImg";

export const metadata = {
    title: "Instalaciones",
    description: "Conoce las instalaciones de Hotel Rancho Roma en Tarapoto: piscina, restaurante y bar, sala recreacional y campo deportivo para toda la familia.",
    alternates: {
        canonical: "/instalaciones",
    },
    openGraph: {
        title: "Instalaciones | Rancho Roma",
        description: "Piscina, restaurante y bar, sala recreacional y campo deportivo en la selva de Tarapoto.",
        url: `${JsonData.urlDomain}instalaciones`,
        images: [JsonData.ogImage],
    },
};

export const Instalaciones = () => {
    const breadcrumbInstalaciones = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": JsonData.urlDomain },
            { "@type": "ListItem", "position": 2, "name": "Instalaciones", "item": `${JsonData.urlDomain}instalaciones` }
        ]
    };
    const pages = [];
    for (const page of JsonData.pagesInstalaciones) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
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
        }else if (page.pageName === "OurCompanies"){
            pages.push({e: <OurCompanies data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "FormSendInfo"){
            pages.push({e: <FormSendInfo data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ConnectCountries"){
            pages.push({e: <ConnectCountries data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurMetrics"){
            pages.push({e: <OurMetrics data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "OurProcess"){
            pages.push({e: <OurProcess data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ProductCatalog"){
            pages.push({e: <ProductCatalog data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "NoFoundProductConsult"){
            pages.push({e: <NoFoundProductConsult data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ListParrafsWithImg"){
            pages.push({e: <ListParrafsWithImg data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbInstalaciones) }}
            />
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Instalaciones;