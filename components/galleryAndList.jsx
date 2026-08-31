"use client";

import { useState, useEffect } from "react";

export const GalleryAndList = (props) => {
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

    const getGalleryClass = (index) => {
        switch(index % 8){
            case 0:
                return "gallery-img big";

            case 5:
                return "gallery-img horizontal";

            default:
                return "gallery-img";
        }
    };
    return (
        <section aria-label={props.data?.titleGeneral || "Galería de imágenes"}>
        {
            props.data.titleGeneral ?
                <h2 className="galleryAndList-titleGeneral">{props.data.titleGeneral}</h2>
            :
                ""
        }
        <div
            className={
                "galleryAndList " +
                (props.data.mobileLayout ? "galleryAndList-mobile " : "") +
                (props.data.isAfterHeader ? "firstOnPageWithHeader " : "") +
                (props.data.hasBackgroundList ? "galleryAndList-background" : "")
            }
        >
            <div className={"galleryAndList-gallery " + (props.data.list.length > 0 ? "" : "galleryAndList-galleryFullWidth")}>
                {
                    props.data.gallery.map((img, index) => (
                        <button
                            key={index}
                            type="button"
                            className="galleryAndList-gallery-item-btn"
                            onClick={() => setSelectedImage(img)}
                            aria-label={"Ampliar imagen: " + img.title}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className={getGalleryClass(index)}
                                loading="lazy"
                            />
                        </button>
                    ))
                }
            </div>
            {
                props.data.list.length > 0 ?
                <div className="galleryAndList-list">
                    <h3 className="galleryAndList-list-title">
                        {props.data.title}
                    </h3>
                    <ul className="galleryAndList-list-items">
                        {
                            props.data.list.map((item, index) => (
                                <li className="galleryAndList-list-item" key={index}>
                                    <div className="galleryAndList-list-item-iconContainer">
                                        <i className={props.data.iconList} aria-hidden="true"></i>
                                    </div>
                                    <div className="galleryAndList-list-item-text">
                                        <h4 className="galleryAndList-list-item-text-highlight">
                                            {item.textHighLight}
                                        </h4>
                                        <p className="galleryAndList-list-item-text-description">
                                            {item.text}
                                        </p>
                                        <div className="galleryAndList-list-item-text-divider"></div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                :
                ""
            }
        </div>

        {/*Lógica del modal */}
        {selectedImage && (
            <div
                className="galleryModal"
                role="dialog"
                aria-modal="true"
                aria-label={selectedImage.title}
                onClick={() => setSelectedImage(null)}
            >
                <div className="galleryModal-content" onClick={(e) => e.stopPropagation()}>
                    <button
                        type="button"
                        className="galleryModal-close-btn"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Cerrar imagen ampliada"
                    >
                        <i className={props.data.iconCloseModal ?? "fa fa-solid fa-xmark"}></i>
                    </button>
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.title || "Imagen ampliada"}
                        className="galleryModal-img"
                    />
                </div>
            </div>
        )}

        </section>
    )
}
export default GalleryAndList;