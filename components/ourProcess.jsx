import ScrollAnimation from "./scrollAnimation";

export const OurProcess = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationStep ?? 0;
    let delayAnimationItems = [];
    if(props.data.steps){
        for(let i = 0; i < props.data.steps.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section className={"ourProcess " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="ourProcess-text">
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <h2 className="ourProcess-text-title">
                        {props.data.title}
                    </h2>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <div className="ourProcess-text-divider" aria-hidden="true"></div>
                </ScrollAnimation>
                <ul className="ourProcess-text-list">
                    {
                        props.data.steps.map((step, index)=>(
                            <ScrollAnimation animation={step.typeAnimation} pixelsDisplacement={step.pixelsAnimation} duration={props.data.durationAnimationSteps} delay={delayAnimationItems[index]} key={step.title + index}>
                                <li className="ourProcess-text-list-item">
                                    <p className="ourProcess-text-list-item-number" aria-hidden="true">
                                        {index + 1}
                                    </p>
                                    <div className="ourProcess-text-list-item-text">
                                        <h3 className="ourProcess-text-list-item-text-title">
                                            {step.title}
                                        </h3>
                                        <p className="ourProcess-text-list-item-text-description">
                                            {step.description}
                                        </p>
                                    </div>
                                </li>
                            </ScrollAnimation>
                        ))
                    }
                </ul>
            </div>
            <div className="ourProcess-image">
                <img
                    alt={props.data.altImg ?? "Nuestros Procesos"}
                    src={props.data.img}
                    className="ourProcess-image-img"
                />
            </div>
        </section>
    )
}
export default OurProcess;