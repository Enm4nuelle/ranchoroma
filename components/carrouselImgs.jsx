import EmblaCarrousel from "./emblaCarrousel";
import React from "react";
import ScrollAnimation from "./scrollAnimation";

export const CarrouselImgs = (props) => {
    const itemsCarousel = props.data.listImgs.map((item, index) => (
        <div
            key={index}
            className={"carrouselImgs-companies-item "}
        >
            <img
                alt={item.altImg}
                src={item.img}
                className="carrouselImgs-companies-item-img"
            />
        </div>
    ));
    return (
        <section
            className={"carrouselTravels " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="carrouselTravels-text">
                    <p className="carrouselTravels-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    <h2 className="carrouselTravels-text-title">
                        {props.data.title}
                    </h2>
                </div>
            </ScrollAnimation>
            <div className="carrouselTravels-companies">
                {
                    <EmblaCarrousel
                        slidesToShow = {props.data.slidesToShow}
                        componentFather = {"carrouselImgs"}
                        loop = {props.data.loop}
                        autoplay = {props.data.autoplay}
                        delayAutoPlay = {props.delayAutoPlay}
                        iconButtonPrev = {props.iconButtonPrev}
                        iconButtonNext = {props.iconButtonNext}
                        alignStart = {props.data.alignStart}
                        buttonAtSides = {props.data.buttonAtSides}
                    >
                        {itemsCarousel}
                    </EmblaCarrousel>
                }
            </div>
        </section>
    )
}
export default CarrouselImgs;