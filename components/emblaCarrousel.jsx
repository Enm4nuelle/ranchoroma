"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useCallback, useEffect, useState} from "react";

export const EmblaCarrousel = (props) => {
    const { getEmblaApi } = props;
    const durationAnimationPlane = 0.9;

    const autoplay = useRef(
        Autoplay({
            delay: props.delayAutoPlay ?? 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    )
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: props.loop,
            align: props.alignStart ?? "start",
            watchDrag: !props.noAllowDrag,
            duration: props.scrollDuration ?? 25,
            // un slide solo cuenta como "visible" si se ve casi completo;
            // si no, uno cortado en el borde igual dispararía el scroll de más
            inViewThreshold: 0.98,
        },
        props.autoplay ? [autoplay.current] : []
    );

    useEffect(() => {
        if (emblaApi && getEmblaApi) {
            getEmblaApi(emblaApi);
        }
    }, [emblaApi, getEmblaApi]);
    
    // ======================================================
    // LÓGICA DEL AVIÓN
    // ======================================================
    const [planePosition, setPlanePosition] = useState({ top: 0, left: 0 });
    // true mientras el carrusel está scrolleando de verdad (llegó al borde).
    // Se usa para desactivar la transición CSS y que el avión siga el
    // movimiento real cuadro a cuadro, sin "lag" contra las imágenes.

    const recomputePlanePosition = useCallback ((day) => {
        if (!emblaApi || day === undefined) return;
        const slide = emblaApi.slideNodes()[day];
        if (!slide) return;

        const style = window.getComputedStyle(emblaApi.containerNode());
        const t = style.transform;
        let tx = 0;
        if (t && t !== "none") {
            const parts = t.match(/matrix.*\((.+)\)/)?.[1].split(", ") ?? [];
            tx = parseFloat(
                t.startsWith("matrix3d")
                    ? parts[12]
                    : parts[4]
            ) || 0;
        }

        setContainerTranslateX(tx);

        setPlanePosition({
            left: tx + slide.offsetLeft + slide.offsetWidth / 2,
            top: day % 2 === 0 ? 450 : 80,
        });
    },[emblaApi]);

    // Cuando cambia el día: si NO hubo scroll real, el translateX sigue
    // igual y esto calcula directo la posición final -> la transición CSS
    // anima el "salto" diagonal entre slides visibles.
    useEffect(() => {
        recomputePlanePosition(props.currentDay);
    }, [props.currentDay, emblaApi, recomputePlanePosition]);

    // Mientras el carrusel SÍ se mueve (llegamos al borde), seguimos el
    // translateX real en cada frame para que el avión vaya exactamente
    // sincronizado con las imágenes, sin depender de una duración fija.
    useEffect(() => {
        if (!emblaApi) return;
        const onScroll = () => recomputePlanePosition(props.currentDay);
        const onSettle = () => {
            recomputePlanePosition(props.currentDay);
        };
        emblaApi.on("scroll", onScroll);
        emblaApi.on("settle", onSettle);
        emblaApi.on("reInit", onScroll);
        return () => {
            emblaApi.off("scroll", onScroll);
            emblaApi.off("settle", onSettle);
            emblaApi.off("reInit", onScroll);
        };
    }, [emblaApi, props.currentDay, recomputePlanePosition]);

    // ======================================================
    // NAVEGACIÓN: salta si el destino ya está visible en pantalla;
    // solo mueve el carrusel cuando hay que "revelar" un slide nuevo
    // ======================================================
    const goToNext = () => {
        if (!emblaApi || props.currentDay >= props.maxDays - 1) return;
        const target = props.currentDay + 1;
        const alreadyVisible = emblaApi.slidesInView().includes(target);
        if (!alreadyVisible) {
            emblaApi.scrollNext();
        }
        if(props.showPlane){
            document.querySelectorAll(`[id^="${props.modalBaseId}"]`).forEach(element => {
                element.classList.remove("show");
            });
            let modalText = document.getElementById(props.modalBaseId + target.toString());
            if (modalText) {
                setTimeout(() => {
                    modalText.classList.add("show");
                }, durationAnimationPlane * 1000);
            }
            props.onDayChange(target);
        }
    };
    const goToPrev = () => {
        if (!emblaApi || props.currentDay <= 0) return;
        const target = props.currentDay - 1;
        const alreadyVisible = emblaApi.slidesInView().includes(target);
        if (!alreadyVisible) {
            emblaApi.scrollPrev();
        }
        if(props.showPlane){
            document.querySelectorAll(`[id^="${props.modalBaseId}"]`).forEach(element => {
                element.classList.remove("show");
            });
            let modalText = document.getElementById(props.modalBaseId + target.toString());
            if (modalText) {
                setTimeout(() => {
                    modalText.classList.add("show");
                }, durationAnimationPlane * 1000);
            }
            props.onDayChange(target);
        }
    };

    // ======================================================
    // LÍNEA PUNTEADA (recorrido decorativo entre items)
    // ======================================================
    const [routeD, setRouteD] = useState("");
    const [containerTranslateX, setContainerTranslateX] = useState(0);

    const buildRoutePath = useCallback(() => {
        if (!emblaApi) return "";

        const points = emblaApi.slideNodes().map((slide, i) => ({
            x: slide.offsetLeft + slide.offsetWidth / 2 + 20,
            y: i % 2 === 0 ? 470 : 100,
        }));

        if (points.length === 0) return "";

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];

            const distanceX = next.x - current.x;

            // Puntos de control para generar una curva suave
            const control1X = current.x + distanceX * 0.5;
            const control1Y = current.y;

            const control2X = next.x - distanceX * 0.5;
            const control2Y = next.y;

            path += `
                C 
                ${control1X} ${control1Y},
                ${control2X} ${control2Y},
                ${next.x} ${next.y}
            `;
        }
        
        return path;
    },[emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => setRouteD(buildRoutePath());
        update();
        emblaApi.on("reInit", update);
        return () => emblaApi.off("reInit", update);
    }, [emblaApi, props.maxDays, buildRoutePath]);

    return (
        <div
            className={"embla " + (props.buttonAtSides ? "emblaButtonSides" : "")}
            role="region"
            aria-roledescription="carousel"
            aria-label={props.carouselLabel ?? "Carrusel"}
        >
            <div className={"embla-buttons " + (props.buttonAtSides ? "embla-buttons-noShowOnDesktop" : "")}>
                <button className="embla__prev" onClick={goToPrev} aria-label="Anterior">
                    <i className={"embla__prev-icon " + (props.iconButtonPrev ?? "fa fa-solid fa-chevron-left")} aria-hidden="true"></i>
                </button>
                <button className="embla__next" onClick={goToNext} aria-label="Siguiente">
                    <i className={"embla__prev-icon " + (props.iconButtonNext ?? "fa fa-solid fa-chevron-right")} aria-hidden="true"></i>
                </button>
            </div>
            {
                props.buttonAtSides?
                <button className="embla__prev embla__prevAtSide" onClick={goToPrev} aria-label="Anterior">
                    <i className={"embla__prev-icon " + (props.iconButtonPrev ?? "fa fa-solid fa-chevron-left")} aria-hidden="true"></i>
                </button>
                :
                ""
            }
            <div className="embla__viewport" ref={emblaRef}>
                <ul className="embla__container" role="list">
                    {React.Children.map(props.children, child => (
                        <li
                            className={"embla__slide embla__slide" + props.componentFather}
                            role="listitem"
                        >
                            {child}
                        </li>
                    ))}
                </ul>
                {
                    props.showPlane ?
                    <React.Fragment>
                        <svg
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: emblaApi ? emblaApi.containerNode().scrollWidth : 0,
                                height: 650,
                                transform: `translateX(${containerTranslateX}px)`,
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        >
                            <path
                                d={routeD}
                                stroke="#bbbbbb"
                                strokeWidth="3"
                                strokeDasharray="10 8"
                                strokeLinecap="round"
                                fill="none"
                            />
                        </svg>
                        <img
                            style={{
                                top: planePosition.top + "px",
                                left: planePosition.left + "px",
                                transition: ("top " + durationAnimationPlane +"s ease-in-out, left " + durationAnimationPlane + "s ease-in-out"),
                            }}
                            src={props.planeTopRight}
                            alt=""
                            id="embla-travel-plane-imgId"
                            className="embla-travel-plane-img"
                        />
                    </React.Fragment>
                    :
                    ""
                }
            </div>
            {
                props.buttonAtSides?
                <button className="embla__next embla__nextAtSide" onClick={goToNext} aria-label="Siguiente">
                    <i className={"embla__prev-icon " + (props.iconButtonNext ?? "fa fa-solid fa-chevron-right")} aria-hidden="true"></i>
                </button>
                :
                ""
            }
        </div>
    )
}
export default EmblaCarrousel;