import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import JsonData from "../data/data.json";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import ToastProvider from "@/components/toastProvider";
import ScrollToTop from "@/components/scrollToTop";
import { ProductProvider } from "@/context/ProductContext";

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
	return (
		<html lang="es" data-scroll-behavior="smooth">
            <head>
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
