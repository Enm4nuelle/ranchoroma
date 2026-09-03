"use client";

import EmblaCarrousel from "./emblaCarrousel";
import ScrollAnimation from "./scrollAnimation";
import Link from "next/link";
import { useState, useEffect } from "react";

export const CarrouselRooms = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedImage(null)
            };
        };
        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedImage]);

    const titleRender = props.data.isMainH1 ?
        (<h1 className="carrouselRooms-text-title">
            {props.data.title}
        </h1>) :
        (<h2 className="carrouselRooms-text-title">
            {props.data.title}
        </h2>);
    const itemsCarousel = props.data.rooms.map((room, index) => {
        const href = room.slug ? `${room.href}/${room.slug}` : room.href;

        const cardContent = (
            <div className="carrouselRooms-items-item">
                <div className="carrouselRooms-items-item-img-container">
                    <button
                        className="carrouselRooms-items-item-img-buttonExpandImg"
                        onClick={() => setSelectedImage({src: room.img, altImg: room.altImg})}
                    >
                        <i className={props.data.iconExpandImage ?? "fa-solid fa-up-right-and-down-left-from-center"} aria-hidden="true"></i>
                    </button>
                    <img
                        src={room.img}
                        alt={room.altImg ?? ("Imagen de la habitación: " + room.title)}
                        className="carrouselRooms-items-item-img"
                    />
                </div>
                <div className="carrouselRooms-items-item-content">
                    <h3 className="carrouselRooms-items-item-content-title">
                        {room.title}
                    </h3>
                    <div className="carrouselRooms-items-item-content-divider" aria-hidden="true"></div>
                
                    <ul className="carrouselRooms-items-item-content-information">
                        {
                            room.featuredAmenities?.map((amenity, index) => (
                                <li key={index} className="carrouselRooms-items-item-content-information-item">
                                    <i className={"carrouselRooms-items-item-content-information-icon " + amenity.icon} aria-hidden="true"></i>
                                    <p className="carrouselRooms-items-item-content-information-text">
                                        {amenity.text}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="carrouselRooms-items-item-content-information">
                        <Link
                            href={href}
                            className="carrouselRooms-items-item-content-information-link buttonPrimary"
                            aria-label={`Ver detalles de ${room.title}`}
                        >
                            {room.buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        );

        return (
            <div
                key={room.idTypeRoom ?? index}
                className="carrouselRooms-items-item"
            >
                {cardContent}
            </div>
        );
    });
    return (
        <section
            className={"carrouselRooms " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <ScrollAnimation
                animation={props.data.typeAnimationHeader}
                pixelsDisplacement={props.data.pixelsAnimationHeader}
                duration={props.data.durationAnimationHeader}
                delay={props.data.delayAnimationHeader}
            >
                <div className="carrouselRooms-text">
                    <p className="carrouselRooms-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    {titleRender}
                </div>
            </ScrollAnimation>
            <div className="carrouselRooms-items">
                {
                    <EmblaCarrousel
                        slidesToShow = {props.data.slidesToShow}
                        componentFather = {"carrouselRooms"}
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

            {selectedImage && (
                <div
                    className="galleryModal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedImage.altImg}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="galleryModal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="galleryModal-close-btn"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Cerrar imagen ampliada"
                        >
                            <i className={props.data.iconCloseModal ?? "fa fa-solid fa-xmark"} aria-hidden="true"></i>
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.altImg || "Imagen ampliada"}
                            className="galleryModal-img"
                        />
                    </div>
                </div>
            )}

        </section>
    )
}
export default CarrouselRooms;