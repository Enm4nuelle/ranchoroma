import JsonData from "../data/data.json";
import FiltersJson from "../data/filters.json";
import ProductsJson from "../data/products.json";

export default function sitemap() {
    const today = new Date().toISOString();
    const baseUrl = JsonData.urlDomain.replace(/\/$/, "");
    let pagesActive = [];

    for(let i = 0; i < FiltersJson.info.length; i++){
        let idType = FiltersJson.info[i].idType;
        pagesActive.push({
            url: `${baseUrl}${FiltersJson.info[i].href}`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        });
        for(let j = 0; j < ProductsJson.maquinarias.length; j++){
            if(idType === ProductsJson.maquinarias[j].idType){
                pagesActive.push({
                    url: `${baseUrl}${FiltersJson.info[i].href}/${ProductsJson.maquinarias[j].nameHref}`,
                    lastModified: today,
                    changeFrequency: "weekly",
                    priority: 0.9,
                });     
            }
        }
    }

    pagesActive.unshift({
        url: `${JsonData.urlDomain}productos`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.8,
    });
    pagesActive.unshift({
        url: JsonData.urlDomain,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.8,
    });
    pagesActive.push({
        url: `${JsonData.urlDomain}cotizacion`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1.0,
    });
    return pagesActive;
}