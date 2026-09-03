import Link from "next/link";
import ScrollAnimation from "./scrollAnimation";

export const CollageImgs = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationImgs ?? 0;
    let delayAnimationItems = [];
    if(props.data.imgs && props.data.imgs.length > 0){
        for(let i = 0; i < props.data.imgs.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section
            className={"collageImgs " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <div className="collageImgs-container">
                <ScrollAnimation animation={props.data.typeAnimationText} pixelsDisplacement={props.data.pixelsAnimationText} duration={props.data.durationAnimationText} delay={props.data.delayAnimationText}>
                    <div className="collageImgs-text">
                        <p className="collageImgs-text-subTitle">
                            {props.data.subTitle}
                        </p>
                        {
                            props.data.isMainH1 ?
                            <h1 className="collageImgs-text-title">
                                <span className="collageImgs-text-title-highligh">{props.data.titleHighLigh}</span>{props.data.title}
                            </h1>
                            :
                            <h2 className="collageImgs-text-title">
                                <span className="collageImgs-text-title-highligh">{props.data.titleHighLigh}</span>{props.data.title}
                            </h2>
                        }
                        <div className="collageImgs-text-divider" aria-hidden="true"></div>
                        <p className="collageImgs-text-description">
                            {props.data.description}
                        </p>
                    </div>
                </ScrollAnimation>
                <ul className="collageImgs-list">
                    {props.data.imgs && props.data.imgs.map((img, index) => (
                        <li key={index} className={"collageImgs-list-item collageImgs-list-itemNumber" + (index + 1)}>
                            <ScrollAnimation animation={img.typeAnimation} pixelsDisplacement={img.pixelsAnimation} duration={props.data.durationAnimationImgs} delay={delayAnimationItems[index]}>
                                <img
                                    src={img.src}
                                    alt={img.altImg}
                                    className={"collageImgs-list-item-img"}
                                />
                            </ScrollAnimation>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default CollageImgs;