import Link from "next/link";
import ScrollAnimation from "./scrollAnimation";

export const ProductCatalog = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationType ?? 0;
    let delayAnimationItems = [];
    if(props.data.types){
        for(let i = 0; i < props.data.types.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section className={"productCatalog " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="productCatalog-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="productCatalog-header-title">
                            {props.data.title}
                        </h1>
                        :
                        <h2 className="productCatalog-header-title">
                            {props.data.title}
                        </h2>
                    }
                    <div className="productCatalog-header-divider" aria-hidden="true"></div>
                    <p className="productCatalog-header-description">
                        {props.data.description}
                    </p>
                </div>
            </ScrollAnimation>
            <ul className="productCatalog-products">
                {
                    props.data.types.map((type, index)=>(
                        <ScrollAnimation animation={type.typeAnimation} pixelsDisplacement={type.pixelsAnimation} duration={props.data.durationAnimationTypes} delay={delayAnimationItems[index]} key={type.title + index}>
                            <li className="productCatalog-products-item">
                                <Link href={type.href}>
                                    <img
                                        src={type.img}
                                        alt={type.altImg ?? "Catálogo de " + type.title}
                                        className="productCatalog-products-item-img"
                                        loading="lazy"
                                    />
                                    <div className="productCatalog-products-divider" aria-hidden="true"></div>
                                    {
                                        props.data.isMainH1 ?
                                        <h2 className="productCatalog-products-title">
                                            {type.title}
                                        </h2>
                                        :
                                        <h3 className="productCatalog-products-title">
                                            {type.title}
                                        </h3>
                                    }
                                </Link>
                            </li>
                        </ScrollAnimation>
                    ))
                }
            </ul>
        </section>
    )
}
export default ProductCatalog;