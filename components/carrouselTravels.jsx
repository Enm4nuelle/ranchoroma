"use client";

import EmblaCarrousel from "./emblaCarrousel";
import React from "react";
import { usePathname } from "next/navigation";
import ScrollAnimation from "./scrollAnimation";
import Link from "next/link";

export const CarrouselTravels = (props) => {
    const pathname = usePathname();
    const onDetailPage = pathname.startsWith("/itinerario/") && pathname !== "/itinerario/";
    const titleRender = props.data.isMainH1 ?
        (<h1 className="carrouselTravels-text-title">
            {props.data.title}
        </h1>) :
        (<h2 className="carrouselTravels-text-title">
            {props.data.title}
        </h2>);
    const itemsCarousel = props.data.travels.map((travel, index) => {
        const href = travel.slug ? `${travel.href}/${travel.slug}` : travel.href;

        const cardContent = (
            <>
                {travel.img && (
                    <img
                        src={travel.img}
                        alt={travel.altImg ?? (`${travel.titlePart1 || ""} ${travel.titlePart2 || ""}`.trim() || "Misión comercial")}
                        className="carrouselTravels-companies-item-content-image"
                    />
                )}
                <div className="carrouselTravels-companies-item-content">
                    <div className="carrouselTravels-companies-item-text">
                        <h3 className="carrouselTravels-companies-item-text-title">
                            <span className="carrouselTravels-companies-item-text-title1">{travel.titlePart1}</span>
                            <br/>
                            <span className="carrouselTravels-companies-item-text-title2">{travel.titlePart2}</span>
                        </h3>
                        <div className="carrouselTravels-companies-item-text-divider"></div>
                        <h3 className="carrouselTravels-companies-item-text-duration">
                            {travel.duration}
                        </h3>
                    </div>
                    {
                        props.data.variant !== "selector" ?
                        <div className="carrouselTravels-companies-item-information-container">
                            {
                                travel.isDone?
                                ""
                                :
                                <div className="carrouselTravels-companies-item-information">
                                    <div className="carrouselTravels-companies-item-information-price">
                                        <p className="carrouselTravels-companies-item-information-price-description">
                                            {travel.price ? props.data.priceDescription : ""}
                                        </p>
                                        <p className="carrouselTravels-companies-item-information-price-value">{travel.price}</p>
                                    </div>
                                    <span className="carrouselTravels-companies-item-information-button">
                                        {travel.buttonText}
                                    </span>
                                </div>
                            }
                            <div className="carrouselTravels-companies-item-lowPart">
                                <p>{travel.isDone ? props.data.isDoneText : travel.lowText}</p>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            </>
        );

        const itemClassName = "carrouselTravels-companies-item " + (travel.isDone ? "carrouselTravels-companies-itemTraveled" : "") +
            (props.data.variant === "selector" ? "carrouselTravels-companies-item-selector" : "");

        // Viaje ya realizado: no navega, se queda como div normal
        if(travel.isDone){
            return (
                <div className={itemClassName}>
                    {cardContent}
                </div>
            );
        }

        // Viaje disponible: Link real para SEO
        return (
            <Link
                key={travel.id ?? index}
                href={href}
                className={itemClassName}
            >
                {cardContent}
            </Link>
        );
    });
    return (
        <section
            className={"carrouselTravels " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
            style={{
                marginBottom: (props.data.variant === "selector" ? "10px" : "")
            }}
        >
            <ScrollAnimation
                animation={props.data.typeAnimationHeader}
                pixelsDisplacement={props.data.pixelsAnimationHeader}
                duration={props.data.durationAnimationHeader}
                delay={props.data.delayAnimationHeader}
            >
                <div className="carrouselTravels-text">
                    <p className="carrouselTravels-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    {titleRender}
                    {
                        props.data.variant !== "selector" ?
                            props.data.noDividerInTitle ?
                            ""
                            :
                            <div className="carrouselTravels-text-divider" aria-hidden="true"></div>
                        :
                        ""
                    }
                </div>
            </ScrollAnimation>
            <div className="carrouselTravels-companies">
                {
                    <EmblaCarrousel
                        slidesToShow = {props.data.slidesToShow}
                        componentFather = {"carrouselTravels"}
                        loop = {props.data.loop}
                        autoplay = {props.data.autoplay}
                        delayAutoPlay = {props.delayAutoPlay}
                        iconButtonPrev = {props.iconButtonPrev}
                        iconButtonNext = {props.iconButtonNext}
                        carouselLabel = {props.data.carouselLabel ?? "Carrousel de Destinos"}
                    >
                        {itemsCarousel}
                    </EmblaCarrousel>
                }
            </div>
            {
                props.data.variant === "selector" ?
                    onDetailPage ?
                    ""
                    :
                    <div className="carrouselTravel-NoSelected">
                        <p className="carrouselTravel-NoSelected-text">{props.data.textNoSelect}</p>
                    </div>
                :
                ""
            }
        </section>
    )
}
export default CarrouselTravels;