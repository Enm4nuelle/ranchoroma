import JsonData from "../data/data.json";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${JsonData.urlDomain}sitemap.xml`,
    };
}