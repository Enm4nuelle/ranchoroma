import JsonData from "../data/data.json";
import PromocionesJson from "../data/promociones.json";
import RoomsJson from "../data/rooms.json"

export default function sitemap() {
    const today = new Date().toISOString();
    let pagesActive = [];
    
    pagesActive.push({
        url: JsonData.urlDomain,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1,
    });

    pagesActive.push({
        url: `${JsonData.urlDomain}promociones`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.9,
    });

    for(let i = 0; i < PromocionesJson.promotions.length; i++){
        pagesActive.push({
            url: `${JsonData.urlDomain}promociones/${PromocionesJson.promotions[i].slug}`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        });
    }

    pagesActive.push({
        url: `${JsonData.urlDomain}habitaciones`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.9,
    });
    for(let i = 0; i < RoomsJson.rooms.length; i++){
        pagesActive.push({
            url: `${JsonData.urlDomain}habitaciones/${RoomsJson.rooms[i].slug}`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        });
    }

    pagesActive.push({
        url: `${JsonData.urlDomain}restaurante`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.9,
    });
    pagesActive.push({
        url: `${JsonData.urlDomain}instalaciones`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.9,
    });
    return pagesActive;
}