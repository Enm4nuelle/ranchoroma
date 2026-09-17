import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import JsonData from "../data/data.json";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import ToastProvider from "@/components/toastProvider";
import ScrollToTop from "@/components/scrollToTop";
import { ProductProvider } from "@/context/ProductContext";

export const metadata = {
    metadataBase: new URL(JsonData.urlDomain),
    title: {
        default: "Rancho Roma | Hotel en Tarapoto",
        template: "%s | Rancho Roma",
    },
    description: "Hotel Resort Rancho Roma: hospédate en la selva de Tarapoto con piscina, restaurante y suites cómodas. Vive la conexión con la naturaleza en Juan Guerra, San Martín.",
    keywords: [
        "hotel en Tarapoto",
        "hospedaje Tarapoto",
        "hotel Juan Guerra",
        "resort selva peruana",
        "suites Tarapoto",
        "Rancho Roma",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Rancho Roma | Conecta con la Selva",
        description: "Hospédate en Hotel Rancho Roma, un espacio único para vivir la tranquilidad y conexión con la selva peruana. Piscina, restaurante y suites cómodas en Tarapoto.",
        url: JsonData.urlDomain,
        siteName: "Hotel Resort Rancho Roma",
        images: [
            {
                url: JsonData.ogImage,
                width: 1200,
                height: 630,
                alt: "Hotel Rancho Roma",
            },
        ],
        locale: "es_PE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rancho Roma | Conecta con la Selva",
        description: "Hospédate en Hotel Rancho Roma, un espacio único para vivir la tranquilidad y conexión con la selva peruana. Piscina, restaurante y suites cómodas en Tarapoto.",
        images: [JsonData.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "favicon.ico"
    },
};

export default function RootLayout({ children }) {
    const header = JsonData.forAllPages.find(
        item => item.pageName === "Header"
    );

    const floatingWhatsapp = JsonData.forAllPages.find(
        item => item.pageName === "FloatingWhatsapp"
    );

    const footer = JsonData.forAllPages.find(
        item => item.pageName === "Footer"
    );

    const loc = JsonData.locationCompany;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": "Hotel Resort Rancho Roma",
        "@id": `${JsonData.urlDomain}#hotel`,
        "image": `${JsonData.urlDomain.substring(0, JsonData.urlDomain.length - 1)}${JsonData.ogImage}`,
        "url": JsonData.urlDomain,
        "logo": `${JsonData.urlDomain}img/imagenesInicio/logo.webp`,
        "description": "Fundo Rodas: local para bodas, quinceañeros y eventos en Pachacamác, Lima. 6000 m² de áreas verdes, casa de campo y piscina.",
        "priceRange": "S/. 100 - S/. 220",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": loc.streetAddress,
            "addressLocality": loc.addressLocality,
            "addressRegion": loc.addressRegion,
            "postalCode": loc.postalCode,
            "addressCountry": loc.addressCountry,
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": footer.data.contacts.find(c => c.type === "phone")?.items[0].text,
            "email": footer.data.contacts.find(c => c.type === "email")?.text,
            "contactType": "reservations",
            "areaServed": "PE",
            "availableLanguage": ["Spanish"],
        },
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "Piscina",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Restaurante",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Bar",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "WiFi gratis",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Sala recreacional",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Campo deportivo",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Juegos para niños",
                "value": true
            }
        ],
        "sameAs": footer.data.socialNetworks.map(s => s.href),
    };
	return (
		<html lang="es" data-scroll-behavior="smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Importaciones de fuentes y iconos de font awesome*/}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </head>
			<body>
                <ProductProvider>
                    <Header data={header.data} />
                    <main>
                        {children}
                    </main>
                    <Footer data={footer.data} />
                    <FloatingWhatsapp data={floatingWhatsapp.data} />
                    <ToastProvider />
                    <ScrollToTop />
                </ProductProvider>
            </body>
		</html>
	);
}
