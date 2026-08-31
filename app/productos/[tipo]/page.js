import JsonData from "../../../data/data.json";
import FilterJson from "../../../data/filters.json";
import ProductsJson from "../../../data/products.json"
import FilterProducts from "@/components/filterProducts";
import NoFoundProductConsult from "@/components/noFoundProductConsult";

export default async function DetailTypeProducts ({params}) {

    const resolvedParams = await params;
    const tipo = resolvedParams?.tipo; 
    let auxTypeIdFilter = 0;
    let auxActualType = {};

    for (let i = 0; i < FilterJson.info.length; i++) {
        let splitUrl = FilterJson.info[i].href.split("/");
        if (splitUrl[2] === tipo) {
            auxActualType = FilterJson.info[i];
            auxTypeIdFilter = FilterJson.info[i].idType;
            break;
        }
    }

    let initialProducts = [];
    if (auxTypeIdFilter) {
        initialProducts = ProductsJson.maquinarias.filter(
            (m) => m.idType === auxTypeIdFilter
        );
    }

    const pages = [];
    for (const page of JsonData.pagesDetailTypeProducts) {
        if (page.pageName === "FilterProducts"){ 
            pages.push({
                e: <FilterProducts
                        data={page.data}
                        key={page.pageName + page.order}
                        initialType={auxActualType}
                        initialProducts={initialProducts}
                        tipo={tipo}
                    />, 
                order: page.order
            });
        }else if (page.pageName === "NoFoundProductConsult"){ 
            pages.push({e: <NoFoundProductConsult data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}