import EmblaCarrousel from "./emblaCarrousel";
import { Stars } from "./stars";
import React from "react";
import ScrollAnimation from "./scrollAnimation";

export const CarrouselTestimonies = (props) => {
    const itemsCarousel = props.data.testimonies.map((testim, index) => (
        <article className="carrouselTestimonies-testimonies-item" key={testim.title + index}>
            <div className="carrouselTestimonies-testimonies-item-img-container">
                <img
                    className="carrouselTestimonies-testimonies-item-img"
                    alt={testim.altImg ?? ("Foto de testimonio de " + testim.title)}
                    src={testim.img}
                    loading="lazy"
                />
            </div>
            <div className="carrouselTestimonies-testimonies-item-detail">
                <blockquote className="carrouselTestimonies-testimonies-item-detail-quote">
                    <i className={"carrouselTestimonies-testimonies-item-detail-quote-icon " + (props.data.iconQuotationMarks)} aria-hidden="true"></i>
                    <p className="carrouselTestimonies-testimonies-item-detail-quote-description">{testim.description}</p>
                </blockquote>
                <div className="carrouselTestimonies-testimonies-item-detail-divider" aria-hidden="true"></div>
                <footer className="carrouselTestimonies-testimonies-item-detail-location">
                    <h3 className="carrouselTestimonies-testimonies-item-detail-location-title">{testim.title}</h3>
                    <p className="carrouselTestimonies-testimonies-item-detail-location-country">
                        <i className={"carrouselTestimonies-testimonies-item-detail-location-country-icon " + props.data.iconLocation}></i>
                        {testim.location}
                    </p>
                    <div className="carrouselTestimonies-testimonies-item-detail-location-stars">
                        <Stars
                            numStars = {testim.numStars}
                            fullIcon = {props.data.iconStarComplete}
                            halfIcon = {props.data.iconStarHalf}
                            emptyIcon = {props.data.iconStarEmpty}
                        />          
                    </div>
                </footer>
            </div>
        </article>
    ));
    return (
        <section
            className={"carrouselTestimonies " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <ScrollAnimation
                animation={props.data.typeAnimationHeader}
                pixelsDisplacement={props.data.pixelsAnimationHeader}
                duration={props.data.durationAnimationHeader}
                delay={props.data.delayAnimationHeader}
            >
                <header className="carrouselTestimonies-text">
                    <p className="carrouselTestimonies-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    <h2 className="carrouselTestimonies-text-title">
                        {props.data.title}
                    </h2>
                    <div className="carrouselTestimonies-text-divider" aria-hidden="true"></div>
                </header>
            </ScrollAnimation>
            <div className="carrouselTestimonies-testimonies">
                {
                    <EmblaCarrousel
                        slidesToShow = {props.data.slidesToShow}
                        componentFather = {"carrouselTestimonies"}
                        loop = {props.data.loop}
                        autoplay = {props.data.autoplay}
                        delayAutoPlay = {props.data.delayAutoPlay}
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
export default CarrouselTestimonies;