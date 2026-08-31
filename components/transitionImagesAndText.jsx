"use client";

import { useEffect, useState } from "react";

export const TransitionImagesAndText = (props) => {
    const [actualIndex, setActualIndex] = useState(0);

    useEffect(() => {
        if (!props.data.items || props.data.items.length <= 1){
            return;
        }
        const interval = setInterval(() => {
            setActualIndex(prev =>
                (prev + 1) % props.data.items.length
            );
        }, props.data.intervalChangeImage);

        return () => {
            clearInterval(interval);
        };
    }, [props.data.intervalChangeImage, props.data.items.length]);
    return (
        <section
            className={"transitionImagesAndText " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            aria-roledescription="carrusel"
            aria-label={props.data.title || "Galería en transición"}
        >
            <div className={"transitionImagesAndText-container " + (props.data.hasBackground ? "transitionImagesAndText-background" : "")}>
                <div className="transitionImagesAndText-video">
                    {props.data.items?.map((item, index) => (
                        <img
                            key={item.title + index}
                            className={`transitionImagesAndText-video-iframe ${index === actualIndex ? "is-active" : "is-hidden"}`}
                            src={item.src}
                            alt={item.title}
                            loading={index === 0 && props.data.isAfterHeader ? "eager" : "lazy"}
                            decoding="async"
                        />
                    ))}
                </div>
                <div className="transitionImagesAndText-text" aria-live="polite">
                    {props.data.items?.map((item, index) => {
                        const isCurrent = index === actualIndex;
                        return (
                            <article 
                                key={item.title + index} 
                                className={`transitionImagesAndText-item ${isCurrent ? "is-active" : "is-hidden"}`}
                                aria-hidden={!isCurrent}
                            >
                                <h2 className="transitionImagesAndText-text-title">
                                    {item.title}
                                </h2>
                                <div className="transitionImagesAndText-text-divider" aria-hidden="true"></div>
                                
                                {item.description && (
                                    <p className="transitionImagesAndText-text-description">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
export default TransitionImagesAndText;