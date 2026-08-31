import ScrollAnimation from "./scrollAnimation";

export const ImgWithHighLigths = (props) => {
    const intervalAnimationItem = props.data.delayEachItemAnimation ?? 0;
    //console.log(props.data.delayEachItemAnimation);
    let delayAnimationItems = [];
    if(props.data.highLights){
        for(let i = 0; i < props.data.highLights.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section className={"imgWithHighLigths " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="imgWithHighLigths-container">
                <ScrollAnimation animation={props.data.typeAnimationImg} duration={props.data.durationAnimationImg} pixelsDisplacement={props.data.pixelsAnimationImg} delay={props.data.delayAnimationImg}>
                    <img
                        className="imgWithHighLigths-img"
                        src={props.data.img}
                        alt={props.data.altImg ?? "Fotografía del equipo"}
                    />
                </ScrollAnimation>
                <ul className="imgWithHighLights-cards">
                    {
                        props.data.highLights?.map((cardItem, index)=>(
                            <ScrollAnimation animation={cardItem.typeAnimation} duration={props.data.durationItemsAnimation} pixelsDisplacement={cardItem.pixelsAnimation} delay={delayAnimationItems[index]} key={cardItem.title + index}>
                                <li className="imgWithHighLights-cards-item">
                                    <h3 className="imgWithHighLights-cards-item-title">
                                        <i className={"imgWithHighLights-cards-item-icon " + cardItem.icon} aria-hidden="true"></i>
                                        {cardItem.title}
                                    </h3>
                                    <p className="imgWithHighLights-cards-item-description">
                                        {cardItem.description}
                                    </p>
                                </li>
                            </ScrollAnimation>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
export default ImgWithHighLigths;