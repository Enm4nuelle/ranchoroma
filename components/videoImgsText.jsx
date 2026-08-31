"use client";

import { useState } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";
import ScrollAnimation from "./scrollAnimation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const VideoImgsText = (props) => {
    const pathname = usePathname;
    const [selectedImage, setSelectedImage] = useState(null);

    useEscapeKey(
        () => {setSelectedImage(null)},
        !!selectedImage
    );

    let buttonElement;
    if(props.data.buttonInfo.linkType === "whatsapp"){
        const url = `https://wa.me/${props.data.buttonInfo.number}?text=${encodeURIComponent(props.data.buttonInfo.defaultMessage)}`;
        buttonElement = (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={"videoImgsText-text-button " + (props.data.buttonInfo.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
            >
                {props.data.buttonInfo.text}
            </a>
        );
    }else if(props.data.buttonInfo.linkType === "samePage"){
        buttonElement = (
            <Link
                href={`/${props.data.buttonInfo.href}`}
                scroll={false}
                className={"videoImgsText-text-button " + (props.data.buttonInfo.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
                onClick={(e) => {
                    if(pathname === "/"){
                        e.preventDefault();
                        document.getElementById(props.data.buttonInfo.href)?.scrollIntoView({ behavior: "smooth" });
                    }
                }}
            >
                {props.data.buttonInfo.text}
            </Link>
        );
    }else{
        buttonElement = (
            <Link
                href={props.data.buttonInfo.href}
                className={"videoImgsText-text-button " + (props.data.buttonInfo.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
            >
                {props.data.buttonInfo.text}
            </Link>
        );
    }

    return (
        <section>
        <div
            className={"videoImgsText " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
        >
            <div
                className={"videoImgsText-container " + (props.data.hasBackground ? "videoImgsText-background" : "")}
                style={{
                    backgroundImage: props.data.imgBackground ? `url(${props.data.imgBackground})` : ""
                }}
            >
                <div className="videoImgsText-multimedia">
                    <div
                        className="videoImgsText-multimedia-video-container"
                        style={{
                            width: props.data.onlyVideo ? "100%" : "",
                            height: "auto",
                            
                        }}
                    >
                        {
                            props.data.videoLocal ?
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    controlsList="nodownload nofullscreen"
                                    preload="metadata"
                                    className="videoImgsText-multimedia-video-local"
                                >
                                    <source src={props.data.videoUrl} type="video/mp4" />
                                    Tu navegador no soporta videos HTML5.
                                </video>
                            :
                                <iframe
                                    className="videoImgsText-multimedia-video"
                                    src={props.data.videoUrl}
                                    title={props.data.titleVideoUrl ?? "Video de YouTube"}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>    
                        }
                    </div>
                    {
                        props.data.onlyVideo ?
                            ""
                        :
                        <div className="videoImgsText-multimedia-images">
                            <button
                                type="button"
                                className="videoImgsText-multimedia-images-imgButton"
                                onClick={() => setSelectedImage(props.data.img1)}
                                aria-label={`Ampliar imagen: ${props.data.img1.title}`}
                            >
                                <img
                                    src={props.data.img1.src}
                                    alt={props.data.img1.title}
                                    className="videoImgsText-multimedia-images-img1"
                                />
                            </button>
                            <button
                                type="button"
                                className="videoImgsText-multimedia-images-imgButton"
                                onClick={() => setSelectedImage(props.data.img2)}
                                aria-label={`Ampliar imagen: ${props.data.img2.title}`}
                            >
                                <img
                                    src={props.data.img2.src}
                                    alt={props.data.img2.title}
                                    className="videoImgsText-multimedia-images-img2"
                                />
                            </button>
                        </div>
                    }
                </div>
                <div className="videoImgsText-text">
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <h2 className="videoImgsText-text-title">
                            {props.data.title + "\n"}<span>{props.data.titleHighLight}</span>
                        </h2>
                    </ScrollAnimation>
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <div className="videoImgsText-text-divider" aria-hidden="true"></div>
                    </ScrollAnimation>
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <p className="videoImgsText-text-description">
                            {props.data.description}
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation={props.data.typeAnimationButton} pixelsDisplacement={props.data.pixelsAnimationButton} duration={props.data.durationAnimationButton} delay={props.data.delayAnimationButton}>
                        {buttonElement}
                    </ScrollAnimation>
                </div>
            </div>
        </div>
        {
            selectedImage ?
                <div
                    className="galleryModal"
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedImage.title}
                >
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="galleryModal-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            :
                ""
        }
        </section>
    )
}
export default VideoImgsText;